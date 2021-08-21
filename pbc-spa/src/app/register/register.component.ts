import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_model/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() valueFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  registerForm!: FormGroup;
  bsConfig!: Partial<BsDatepickerConfig>;

  user!: User;
  constructor(
    private _authSercice: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private roter:Router
  ) {}
  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ['male'],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        username: ['', Validators.required],
        password: new FormControl('', [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(5),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validator: this.passwordMatchValidator }
    );
  }
  ngOnInit(): void {
    // this.registerForm=new FormGroup({
    //   username:new FormControl('',Validators.required),
    //   password:new FormControl('',[Validators.required,Validators.maxLength(100),Validators.minLength(5)]),
    //   confirmPassword:new FormControl('',[Validators.required])
    // });
    (this.bsConfig = {
      containerClass: 'theme-red',
    }),
      this.createRegisterForm();
  }
  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }
  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this._authSercice.register(this.user).subscribe(
        () => {
          this.alertify.success('register successfull');
        },
        (error) => {
          this.alertify.error(error);
        },
        () => {
          this._authSercice.login(this.user).subscribe(()=>{
          this.roter.navigate(['/members'])
          });
        }
      );
    }
    // this._authSercice.register(this.model).subscribe(
    //   () => {
    //     this.alertify.success('registeration is successful');
    //   },
    //   (error) => {
    //     this.alertify.error(error);
    //   }
    // );
    console.log(this.registerForm.value);
  }
  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}
