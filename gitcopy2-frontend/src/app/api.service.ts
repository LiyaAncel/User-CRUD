import { Injectable } from '@angular/core';
import { Observable }  from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/user'
  constructor(private http:HttpClient) { }

  getAllUsers():Observable<any>{
    return this.http.get(`${this.apiUrl}`)
  }
  
  getSingleUser(id:any):Observable<any>{
    let ids = id
    return this.http.get(`${this.apiUrl}/${ids}`)
  }

  createUser(data:any):Observable<any>{
    return this.http.post(`${this.apiUrl}`, data)
  }

  updateUser(data:any, id:any):Observable<any>{
    let ids = id
    return this.http.put(`${this.apiUrl}/${ids}`, data)
  }

  deleteUser(id:any):Observable<any>{
    let ids = id
    return this.http.delete(`${this.apiUrl}/${ids}`)
  }

}
