import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostItem} from '../../models/post-item';
import {PostsService} from '../../services/posts.service';
import {AppComponent} from '../../../../app.component';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {finalize} from 'rxjs/operators';
import {FirebaseStorageService} from '../../../../firebase/firebase-storage.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.scss']
})
export class SingleNewsComponent implements OnInit {

  id: number;

  post: PostItem;
  postTopics: string[];

  private sub: any;

  private env = this.appComponent.env;

  public Editor = InlineEditor;
  saveTitle = false;
  saveTag = false;
  saveBody = false;
  saveAuthor = false;

  uploadProgress: Observable<number>;
  openNewsDeleteModal: boolean;

  constructor(private route: ActivatedRoute, private postsService: PostsService, private appComponent: AppComponent,
              private firebaseStorageService: FirebaseStorageService, private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] === 'new') {
        this.post = new PostItem(
          'assets/choose-photo-placeholder.jpeg',
          'Inserisci qua il titolo della notizia',
          'Inserisci il contenuto della notizia',
          'Inserisci L\'autore',
          false);
      } else {
        this.id = +params['id']; // (+) converts string 'id' to a number
        this.getPostById(this.id);
      }
      this.getTopics();
    });
  }

  getPostById(id: number) {
    this.postsService.getPostById(this.env.apiUrl, id).subscribe(
      post => {
        this.post = post;
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

  onChange({editor}: ChangeEvent) {
    this.post.body = editor.getData();
    this.saveBody = true;
  }

  updatePost() {
    if (this.post.id != null) {
      this.postsService.updatePostById(this.env.apiUrl, this.post.id, this.post)
        .subscribe(
          data => {},
          error => {},
          () => {
            this.postsService.getPostById(this.env.apiUrl, this.post.id).subscribe(
              data => {
                this.post = data;
                this.saveTitle = false;
                this.saveTag = false;
                this.saveBody = false;
                this.saveAuthor = false;
                this.appComponent.createSuccessNotification(
                  'Salvato!',
                  'Le modifiche sono state salvate correttamente!');
              }
            );
          }
        );
    }
  }

  saveText(save: boolean) {
    if (save) {
      this.updatePost();
    }
  }

  uploadImage(event: Event) {
    const uploadImageResponse = this.firebaseStorageService.uploadImage(event);
    this.uploadProgress = uploadImageResponse.task.percentageChanges();
    uploadImageResponse.task.snapshotChanges().pipe(
      finalize(() => {
        uploadImageResponse.ref.getDownloadURL().subscribe(downloadURL => {
          this.post.image_link = downloadURL;
          this.updatePost();
        });
      })
    ).subscribe();
  }

  setImportant(isImportant: boolean) {
    const post = this.post;
    post.main_topic = isImportant;
    this.postsService.updatePostById(this.env.apiUrl, post.id, post)
      .subscribe(
        data => {},
        error => { console.log(error); },
        () => {
          this.postsService.getPostById(this.env.apiUrl, post.id).subscribe(
            data => { this.post = data; }
          );
          this.appComponent.createSuccessNotification(
            'Salvata!',
            'La notizia è stata aggiornata come importante!');
        }
      );
  }

  delete() {
    this.postsService.deletePostById(this.env.apiUrl, this.post.id).subscribe(
      data => {},
      error => { console.log(error); },
      () => {
        this.openNewsDeleteModal = false;
        this.router.navigate(['admin/pages/news-page']);
        this.appComponent.createSuccessNotification(
          'Eliminata!',
          'La notizia è stata eliminata correttamente!');
      }
    );
  }

  createPost() {
    this.post.date = new Date().toISOString();
    this.postsService.createPost(this.env.apiUrl, this.post)
      .subscribe(
        data => { this.id = data.id; },
        error => {},
        () => {
          this.router.navigate(['admin/pages/news-page/' + this.id]);
          this.appComponent.createSuccessNotification(
            'Create!',
            'La notizia è stata creata correttamente!');
        }
      );
  }
}
