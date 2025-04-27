import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { }
  private readonly _HttpClient = inject(HttpClient);

  addNote(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}api/v1/notes`,data)
  }
  getUserNato():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}api/v1/notes`)
  }
  updateNote(id:string , data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}api/v1/notes/${id}`,data)
  }
  deleteNote(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}api/v1/notes/${id}`)
  }

}
