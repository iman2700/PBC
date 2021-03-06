import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 import { User } from 'src/app/_model/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  user: any;
  // galleryOptions!: NgxGalleryOptions[];
  // galleryImage!: NgxGalleryImage[];
  constructor(
    private userServic: UserService,
    private alertify: AlertifyService,
    private rout: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadUser();
    // this.rout.data.subscribe(data=>{
    //   this.user=data['user'];
    // })
    // this.galleryOptions = [
    //   {
    //     width: '500px',
    //     height: '500px',
    //     imagePercent: 100,
    //     thumbnailsColumns: 4,
    //     imageAnimation: NgxGalleryAnimation.Slide,
    //     preview: false,
    //   },
    // ];
    // this.galleryImage = this.getImages();
  }
  // getImages(){
  //   const imageUrl:any=[];
  //   for(const photo of this.user.photos){  
  //   imageUrl.push=({
  //       small:photo.url,
  //       medium:photo.url,
  //       big:photo.url,
  //       description: photo.description
  //   });
  //   return imageUrl;
  // }
  // }
  loadUser() {
    this.userServic.getUser(this.rout.snapshot.params['id']).subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
