import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  register(user): Observable<any> {
    console.log('==line no->17',this.options)
    return this.http.post('/api/user', JSON.stringify(user), this.options);
  }

  login(credentials): Observable<any> {
    return this.http.post('/api/login', JSON.stringify(credentials), this.options);
  }

  getUsers(): Observable<any> {
    console.log("=========== getusers[service] ============")
    return this.http.get("/api/users").map(res => res.json());
  }

  deleteUser(user): Observable<any> {
    return this.http.delete(`/api/deleteUser/${user._id}`, this.options);
  }

  editUser(user): Observable<any> {
    return this.http.put(`/api/editUser/${user._id}`, JSON.stringify(user), this.options);
  }
 
}
