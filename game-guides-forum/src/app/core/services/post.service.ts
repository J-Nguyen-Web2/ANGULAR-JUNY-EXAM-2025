import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../../models/post.model";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private getPostApiUrl = 'http://localhost:3000/api/posts?limit={0}';
    private createPostApiUrl = 'http://localhost:3000/api/posts';

    constructor(private httpClient: HttpClient) {}
    
    getPosts(limit: number = 10): Observable<Post[]> {
        return this.httpClient.get<Post[]>(this.getPostApiUrl.replace('{0}', limit.toString())); 
    }

    getPostById(postId: string): Observable<Post> {
        return this.httpClient.get<Post>(`this.getPostApiUrl/${postId}`); 
    }

    createPost(userId: string, themeName: string, postText: string): Observable<Post> {
        const body = JSON.stringify({ themeName, postText });
        return this.httpClient.post<Post>(this.createPostApiUrl, body, { 
        
            headers: {
                'Content-Type': 'application/json' 
            }
        })
    }
}