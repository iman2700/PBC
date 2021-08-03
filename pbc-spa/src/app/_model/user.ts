import { Data } from "@angular/router";
import { Photo } from "./photo";

export interface User {
    id:number;
    userName:string;
    age:number;
    gender:string;
    created:Data;
    lastActive:Date;
    photoUrl:string;
    city:string;
    country:string;
    interests?:string;
    introduction?:string;
    lookingFor?:string;
    photos?:Photo[];
    
    
}

