import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import {PostsService} from './services/posts.service';
import {Pagination} from './models/pagination';
import {PostItem} from './models/post-item';

@Component({
  selector: 'app-news-settings-page',
  templateUrl: './news-settings-page.component.html',
  styleUrls: ['./news-settings-page.component.scss']
})
export class NewsSettingsPageComponent implements OnInit {

  pageSize = 20;
  currentPage = 1;
  filters = [];
  pagination: Pagination;
  postsArguments: PostItem[];

  postTopics: string[];

  listOfPosts: PostItem[];

  pagedPostsAreLoaded = false;
  mainPostsAreLoaded = false;

  selected: string[];

  private env = this.appComponent.env;
  modalPost: PostItem;
  openNewsDeleteModal: boolean;

  constructor(private postsService: PostsService, private appComponent: AppComponent) { }

  ngOnInit() {
    this.getPosts(null, this.selected, this.pageSize);
    this.getMainPosts();
    this.getTopics();
  }

  getPosts(page: number, filters: string[], pageSize: number) {
    this.postsService.getPosts(this.env.apiUrl, page, filters, pageSize).subscribe(
      pagination => {
        this.pagination = pagination;
        this.listOfPosts = pagination.data;
        this.pagedPostsAreLoaded = true;
      },
      err => console.error(err)
    );
  }

  getMainPosts() {
    this.postsService.getMainPosts(this.env.apiUrl).subscribe(
      posts => {
        this.postsArguments = posts;
        this.mainPostsAreLoaded = true;
      },
      err => console.error(err)
    );
  }

  getTopics() {
    this.postsService.getTopics(this.env.apiUrl).subscribe(
      topics => {
        this.postTopics = topics;
      },
      err => console.error(err)
    );
  }

  onSelect(selectValues) {
    this.filters = selectValues;
    this.getPosts(null, selectValues, this.pageSize);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getPosts(this.currentPage, this.selected, this.pageSize);
  }

  onSelectPageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.getPosts(this.currentPage, this.selected, this.pageSize);
  }

  setImportant(i: number, isImportant: boolean) {
    const post = this.listOfPosts[i];
    post.main_topic = isImportant;
    this.postsService.updatePostById(this.env.apiUrl, post.id, post)
      .subscribe(
        data => {},
        error => { console.log(error); },
        () => {
          this.postsService.getPostById(this.env.apiUrl, post.id).subscribe(
            data => { this.listOfPosts[i] = data; }
          );
          this.appComponent.createSuccessNotification(
            'Salvata!',
            'La notizia è stata aggiornata correttamente!');
        }
      );
  }

  openDeleteModal(post: PostItem) {
    this.modalPost = post;
    this.openNewsDeleteModal = true;
  }

  delete(i: number) {
    this.postsService.deletePostById(this.env.apiUrl, i).subscribe(
      data => {},
      error => { console.log(error); },
      () => {
        this.openNewsDeleteModal = false;
        this.getPosts(this.currentPage, this.filters, this.pageSize);
        this.appComponent.createSuccessNotification(
          'Eliminata!',
          'La notizia è stata eliminata correttamente!');
      }
    );
  }
}
