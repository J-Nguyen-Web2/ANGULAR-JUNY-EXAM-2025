
import { Theme } from "./theme.model";
import { User } from "./user.model";

export interface Post {
    _id: string;
    likes: string[];
    text: string;
    userId: User;
    guideId: Theme;
    created_at: Date;
}