import { Component, OnInit } from '@angular/core';
import { User } from '../../_model/user';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  users: User[] = [];
  constructor(
    private userServic: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }
  loadUser() {
    this.userServic.getUsers().subscribe(
      (users: User[]) => {
        console.log(users)
        this.users = users;
       
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
