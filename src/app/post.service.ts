import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts`)
  }

  getPost(postId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts/${postId}`)
  }

  getComments(postId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts/${postId}/comments`)
  }

  createPost(post: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' });
    return this.http.post<any>(`${this.apiUrl}/posts`, JSON.stringify(post), { headers });
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/posts/${postId}`);
  }

  updatePost(postId: number, post: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' });
    return this.http.put<any>(`${this.apiUrl}/posts/${postId}`, JSON.stringify(post), { headers });
  }
}
