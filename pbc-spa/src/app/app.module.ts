import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import{HttpClientModule} from '@angular/common/http';
import { NavComponent } from './nav/nav.component'
import { FormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './member-list/member-list.component';
import { appRoutes } from './routes';

// import { ErrorInterceptorProvider } from './_services/Error.inteceptor';
 
@NgModule({
  declarations: [AppComponent,ValueComponent, NavComponent, HomeComponent, RegisterComponent, ListComponent, MessagesComponent, MemberListComponent],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule,FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService],
  // ErrorInterceptorProvider
  bootstrap: [AppComponent],
  
})
export class AppModule {}
