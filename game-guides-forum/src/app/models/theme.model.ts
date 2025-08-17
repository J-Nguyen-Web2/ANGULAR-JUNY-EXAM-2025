import { User } from "."

export interface Theme {
    _id: string;
    subscribers: string[];
    posts: string[];
    themeName: string;
    userId: User; 
    created_at: Date;
}