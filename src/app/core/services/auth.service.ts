import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private readonly _HttpClient = inject(HttpClient);
  userData:WritableSignal<any> = signal(null);

  signUp(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}api/v1/users/signUp`,data)
  }
  signIn(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}api/v1/users/signIn`,data)
  }
  saveData():void{
    if (localStorage.getItem('noteUserToken') !== null) {
      this.userData.set(jwtDecode(localStorage.getItem('noteUserToken')!));
      localStorage.setItem('noteUserId',this.userData().id);
      localStorage.setItem('noteUserEmail',this.userData().email);
    }
  }
}
