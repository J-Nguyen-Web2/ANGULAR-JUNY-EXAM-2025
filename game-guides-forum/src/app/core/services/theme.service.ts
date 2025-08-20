import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Theme } from "../../models/theme.model";

@Injectable({
    providedIn: 'root' 
})
export class ThemeService {
    
    private apiUrl = 'http://localhost:3000/api';
    
    constructor(private httpClient: HttpClient) {}

    getThemes(): Observable<Theme[]> {
        return this.httpClient.get<Theme[]>(`${this.apiUrl}/themes`);
    }
    
    getThemeById(themeId: string): Observable<Theme> {
        return this.httpClient.get<Theme>(`${this.apiUrl}/themes/${themeId}`);
    }


    createTheme(themeName: string, postText: string): Observable<Theme> {
        return this.httpClient.post<Theme>(`${this.apiUrl}/themes`, { themeName, postText }, {
            withCredentials: true,
        });
    }

    updateTheme(theme: Theme): Observable<Theme> {
        return this.httpClient.put<Theme>(`${this.apiUrl}/themes/${theme._id}`, { themeName: theme.themeName},
            {withCredentials: true}
        );
    }
    
    deleteTheme(themeId: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.apiUrl}/themes/${themeId}`,
            {withCredentials: true}
        )
    }
}
