import { Post, User } from "."

export interface Theme {
    _id: string;
    subscribers: string[];
    posts: Post[];
    themeName: string;
    userId: User; 
    created_at: Date;
}