import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
registerMode=false;
  constructor(private http:HttpClient) { }
  values:any;

  ngOnInit(): void {
  }
registerToggle()
{
  this.registerMode=!this.registerMode;
  this.getValue();
}

getValue() {
  this.http.get('http://localhost:5000/values').subscribe(
    (response) => {
      this.values = response;
    },
    (error) => {
      console.log(error);
    }
  );
}
cancelRegisterMode(registerMode:boolean)
{
this.registerMode=registerMode;
}

}
