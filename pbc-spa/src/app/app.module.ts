import { NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './member/member-list/member-list.component'; 
import { appRoutes } from './routes';
import { MemberCardComponent } from './member/member-card/member-card.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { PhotoEditorComponent } from './member/photo-editor/photo-editor.component';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { UnsavedGuard } from './_guards/unsaved.guard';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";



 



 

export function tokenGetter()
{
  return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig
{
  overrides={
    pinch:{enable:false},
    rotate:{enable:false}
  };
}

// import { ErrorInterceptorProvider } from './_services/Error.inteceptor';
 
@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListComponent,
    MessagesComponent,
    MemberListComponent,
    MemberCardComponent,
    MemberDetailComponent,
    PhotoEditorComponent,
    MemberEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FileUploadModule,
     JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,  
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth'],
      },
    }),
  ],
  providers: [AuthService, MemberDetailResolver, MemberEditResolver,UnsavedGuard,
    {provide:HAMMER_GESTURE_CONFIG,useClass:CustomHammerConfig} ,

  ],
  // ErrorInterceptorProvider
  bootstrap: [AppComponent],
})
export class AppModule {}
