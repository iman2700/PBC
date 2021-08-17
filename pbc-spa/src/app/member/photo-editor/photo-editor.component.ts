import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from 'src/app/_model/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input()
  photos: Photo[] | undefined;
  @Output() getMemberPhotoChange= new EventEmitter<string>();
  constructor(
    private authServic: AuthService,
    private userServic: UserService,
    private alertify: AlertifyService
  ) {}
  ngOnInit() {
    this.initializeUploader();
  }
  bserUrl = environment.apiUrl;
   currentMain ?: Photo;
  uploader!: FileUploader;
  hasBaseDropZoneOver!: boolean;
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  initializeUploader() {
    this.uploader = new FileUploader({
      url:
        this.bserUrl +
        'users/' +
        this.authServic.decodedToken.nameid +
        '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: true,
      maxFileSize: 10 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
        };
        this.photos?.push(photo);
      }
    };
  }
  setMainPhoto(photo: Photo) {
    this.userServic
      .setMainPhoto(this.authServic.decodedToken.nameid, photo.id)
      .subscribe(
        () => {
          this.currentMain= this.photos?.filter(p=>p.isMain===true)[0];
          this.currentMain!.isMain=false;
          photo.isMain=true;
            // this.getMemberPhotoChange.emit(photo.url);
          this.authServic.changeMemberPhoto(photo.url)
          this.authServic.currentUser.photoUrl=photo.url;
          localStorage.setItem('user',JSON.stringify(this.authServic.currentUser));
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
  deletePhoto(id:number)
  {
    this.alertify.confirm('are you sure you want to delete this photo?',()=>{
      this.userServic.deletePhoto(this.authServic.decodedToken.nameid,id).subscribe(()=>{
        debugger;
        this.photos?.slice(this.photos.findIndex(p=>p.id===id),1);
        this.alertify.success('photo has been delete');
      },error=> {
        this.alertify.error('Failed to delete the photo');
      }
      );
    })
  }
}
