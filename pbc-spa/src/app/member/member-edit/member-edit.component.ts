import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_model/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm')
  editForm!: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  user!: User;
  photoUrl?:string;
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userServis: UserService,
    private authServic: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });
     this.authServic.crrentPhotoUrl.subscribe(photo=>this.photoUrl= photo);
  }
  updateUser() { 
    this.userServis
      .updateUser(this.authServic.decodedToken.nameid, this.user)
      .subscribe(
        (next) => {
          this.alertify.success('Profile updated successfully');
          this.editForm.reset(this.user);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
  updateMainPhoto(photoUrl:string)
  {
    this.user.photoUrl=photoUrl;
  }
}
