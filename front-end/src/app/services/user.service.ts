import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/users';
const baseUrl = 'http://localhost:3333/api/';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) { }

    login(data: any): Observable<any> {
        return this.http.post(baseUrl + `login`, data);
    }
    register(data: any): Observable<any> {
        return this.http.post(baseUrl + `user`, data);
    }
    getUsers(search: any): Observable<User[]> {
        return this.http.get<User[]>(`${baseUrl}users?search=${search}`);
    }
    getUser(id: any): Observable<User> {
        return this.http.get<User>(`${baseUrl}user/${id}`);
    }
    update(id: any, data: any): Observable<any> {
        return this.http.put(`${baseUrl}user/${id}`, data);
    }
    delete(id: any): Observable<any> {
        return this.http.delete(`${baseUrl}user/${id}`);
    }
}
