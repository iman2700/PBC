import { Data } from "@angular/router";
import { Photo } from "./photo";

export interface User {
    id:number;
    userName:string;
    Password:string;
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
    knownAs?:string;
    intersts?:string;
    photos?:Photo[];
    
    
}

