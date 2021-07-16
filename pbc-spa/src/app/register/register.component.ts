import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  constructor(private _authSercice:AuthService) { }

  ngOnInit(): void {
  }
  register()
  {
    this._authSercice.register(this.model).subscribe(()=>
      {
        console.log("registeration is successful");
      },
      error=>{
          console.log(error);
      });
       }
  cancel()
  {
    this.cancelRegister.emit(false);
    console.log('cancelled')
  }

}
