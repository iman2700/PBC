import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_model/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
user:any;
  constructor(private userServic:UserService,private alertify:AlertifyService,private rout:ActivatedRoute) { }

  ngOnInit() {
      this.loadUser();
    // this.rout.data.subscribe(data=>{
    //   this.user=data['user'];
    // })
  }
  loadUser()
  {

    this.userServic.getUser(this.rout.snapshot.params['id']).subscribe(
      (user: User) => {
       console.log(user)
        this.user = user;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
