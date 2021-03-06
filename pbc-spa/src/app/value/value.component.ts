import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css'],
})
export class ValueComponent implements OnInit {
  constructor(private http: HttpClient) {}
  values: any;
  ngOnInit() {
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
}
