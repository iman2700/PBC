import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_model/user';
// JwtModule.forRoot
// const httpOptions={
//   headers: new HttpHeaders({
//   'Authorization':'Bearer ' + localStorage.getItem('token')
//   })   
// }

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.baseUrl + 'user/getuser');
    // return this.http.get<User[]>(this.baseUrl + 'user/getuser',httpOptions);

  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'user/getuser/'+id);
  }
  updateUser(id:number,user:User){
    return this.http.put(this.baseUrl+'user/updatuser/'+id,user);

  }
  setMainPhoto(userId:number,id:number)
  {
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/'+ id+ '/setMain',{})
  }
  deletePhoto(userId:number,id:number)
  {
    return this.http.delete(this.baseUrl+'users/'+userId+'/photos/'+id)
  }
}
