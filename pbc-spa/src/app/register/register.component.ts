import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valueFromHome:any;
  @Output() cancelRegister=new EventEmitter();
model:any={};
  constructor(private _authSercice:AuthService,private alertify:AlertifyService) { }

  ngOnInit(): void {
  }
  register()
  {
    this._authSercice.register(this.model).subscribe(()=>
      {
        this.alertify.success("registeration is successful");
      },
      error=>{
          this.alertify.error(error);
      });
       }
  cancel()
  {
    this.cancelRegister.emit(false);
    console.log('cancelled')
  }

}
