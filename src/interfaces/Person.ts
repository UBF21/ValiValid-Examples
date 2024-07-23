import { StringMappingType } from "typescript";

export interface Person{
    name:string;
    lastName:string;
    yearsOld:number | string;
    sex: "F" | "M" | "",
    email:string;
    urlLinkedin:string;
    skills: "JavaScript" | "TypeScript" | "ReactJS" | "Python" | "",
    foto:Blob,
    cv:Blob,
    profile:Blob
}