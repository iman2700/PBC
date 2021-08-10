import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { UnsavedGuard } from './_guards/unsaved.guard';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[
  { path: 'members', component: MemberListComponent},
  // { path: 'members/:id', component: MemberDetailComponent,resolve:{users:MemberDetailResolver}},
  { path: 'members/:id', component: MemberDetailComponent},
  { path: 'member/edit', component: MemberEditComponent,resolve:{user: MemberEditResolver}},
  { path: 'messages', component: MessagesComponent},
  { path: 'list', component: ListComponent }, 
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'members', component: MemberListComponent,canActivate:[AuthGuard] },
];