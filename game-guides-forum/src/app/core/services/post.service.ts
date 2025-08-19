import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../../models/post.model";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private getPostApiUrl = 'http://localhost:3000/api/posts?limit={0}';
    private apiUrl = 'http://localhost:3000/api/';

    constructor(private httpClient: HttpClient) {}
    
    getPosts(limit: number = 10): Observable<Post[]> {
        return this.httpClient.get<Post[]>(this.getPostApiUrl.replace('{0}', limit.toString())); 
    }

    getPostById(postId: string): Observable<Post> {
        return this.httpClient.get<Post>(`this.apiUrl/posts/${postId}`); 
    }

    // createPost(postId: string, postText: string): Observable<Post> {
    //     const body = JSON.stringify({ themeName, postText });
    //     return this.httpClient.post<Post>(`this.createPostApiUrl`, body, { 
        
    //         headers: {
    //             'Content-Type': 'application/json' 
    //         }
    //     })
    // }
createPost(themeId: string, postText: string): Observable<Post> {
  const body = { postText };
  return this.httpClient.post<Post>(
    `http://localhost:3000/api/themes/${themeId}`,
    body,
    { 
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true 
     });
    }
    editPost(themeId: string, postId: string, text: string): Observable<Post> {
    return this.httpClient.put<Post>(`${this.apiUrl}/themes/${themeId}/posts/${postId}`, { text }, {
      withCredentials: true
    });
  }

  deletePost(themeId: string, postId: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/themes/${themeId}/posts/${postId}`, {
      withCredentials: true
    });
  }
}