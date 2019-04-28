import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '../../../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {PostItem} from '../models/post-item';
import {Pagination} from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts(apiUrl: string, page: number, filters: string[], pageSize: number): Observable<Pagination> {
    // Parameters obj-
    let params: HttpParams = new HttpParams();

    if (page != null && page !== 0) {
      params = params.append('page', page.toString());
    }
    if (filters !== undefined && filters.length > 0) {
      filters.forEach(filter => {
        params = params.append('filter[]', filter);
      });
    }
    params = params.append('pageSize', pageSize.toString());
    return this.http.get<Pagination>( apiUrl + '/news/posts', {params});
  }

  getMainPosts(apiUrl: string): Observable<PostItem[]> {
    return this.http.get<PostItem[]>( apiUrl + '/news/main-posts');
  }

  getTopics(apiUrl: string): Observable<string[]> {
    return this.http.get<string[]>( apiUrl + '/news/topics');
  }

  getPostById(apiUrl: string, id: number): Observable<PostItem> {
    return this.http.get<PostItem>( apiUrl + '/news/' + id);
  }

  createPost(apiUrl: string, post: PostItem): Observable<PostItem> {
    return this.http.post<PostItem>( apiUrl + '/news/posts', post);
  }

  updatePostById(apiUrl: string, id: number, post: PostItem) {
    return this.http.put( apiUrl + '/news/posts/' + id, post);
  }

  deletePostById(apiUrl: string, id: number) {
    return this.http.delete( apiUrl + '/news/posts/' + id);
  }
}
