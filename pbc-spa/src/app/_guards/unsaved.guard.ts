import { Injectable } from "@angular/core";
import {CanDeactivate} from "@angular/router";
 
import { MemberEditComponent } from "../member/member-edit/member-edit.component";
 

@Injectable()
export class UnsavedGuard implements CanDeactivate<MemberEditComponent>{
    canDeactivate(component: MemberEditComponent)
    {
        if(component.editForm.dirty)
        {
            return confirm("Are you sure you want to continue? any undaved changes will be lost")
        }
        return true;
    }
}