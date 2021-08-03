import { Data } from "@angular/router";

export interface Photo {
id:number;
url:string;
description:string;
dateAdded:Data;
isMain:boolean;

}
