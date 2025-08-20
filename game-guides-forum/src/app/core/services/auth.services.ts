import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { User } from "../../models";

@Injectable({ 
    providedIn: "root"
})
export class AuthService{ 
    private apiUrl = 'http://localhost:3000/api'
    private _isLoggedIn = signal<boolean>(false);    
    private _currentUser = signal<User | null>(null); 
    public isLoggedIn = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    constructor(private httpClient: HttpClient) { 
        const savedUser = localStorage.getItem('currentUser');
        if(savedUser) {
            const user = JSON.parse(savedUser); 
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
        }
    }

    getUserById(id: string): Observable<User> {
        return this.httpClient.get<User>(`${this.apiUrl}/users/${id}`)
    }
    
    login(email: string, password: string): Observable<User> { 
        return this.httpClient.post<User>(`${this.apiUrl}/login`, {email, password},{
            withCredentials: true 
        }).pipe(
            catchError((err) => {
                return throwError(() => err)
            }),
            tap(user => {
                this._currentUser.set(user);
                this._isLoggedIn.set(true); 
                localStorage.setItem('currentUser', JSON.stringify(user)); 
            })
        )
    }

    register( 
        username: string, 
        email: string, 
        tel: string, 
        password: string, 
        rePassword: string 
        ): Observable<User>  {
        return this.httpClient.post<User>(`${this.apiUrl}/register`,{
            username, 
            email,
            tel,
            password, 
            rePassword
        },{
            withCredentials: true
        }).pipe(
            tap(user => {
                this._currentUser.set(user);
                this._isLoggedIn.set(true);
                localStorage.setItem('currentUser', JSON.stringify(user));
            })            
        )        
    }
    
    logout(): Observable<void>  {
        return this.httpClient.post<void>(`${this.apiUrl}/logout`, {}, {
            withCredentials: true
        }).pipe(
            tap(() => {
                this._currentUser.set(null);
                this._isLoggedIn.set(false); 
                localStorage.removeItem('currentUser'); 
            })
        )
    }
    
    getCurentUserId(): string | null { 
        return this._currentUser()?._id || null;
    }
    
    updateUser(userUpdate: User): Observable<User> {
        const apiUser = <User>{
            _id: userUpdate._id,
            username: userUpdate.username,
            email: userUpdate.email,
            tel: userUpdate.tel
        };

        return this.httpClient.put<User>(`${this.apiUrl}/user/${userUpdate._id}`, apiUser, { 
            withCredentials: true
        }).pipe(
            tap(user => {
                this._currentUser.set(user);
                localStorage.setItem('currentUser', JSON.stringify(user));
            })            
        ) 
    }
}
