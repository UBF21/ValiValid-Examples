import { StringMappingType } from "typescript";

export interface Person{
    name:string;
    lastName:string;
    yearsOld:number | string;
    sex: "F" | "M" | "",
    skills: "JavaScript" | "TypeScript" | "ReactJS" | "Python" | ""
}