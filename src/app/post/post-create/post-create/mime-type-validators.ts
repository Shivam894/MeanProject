import { AbstractControl } from "@angular/forms";
import { Observable, Observer } from "rxjs";

export const mimeType = (control: AbstractControl): Promise<{[key: string]: any}> |
Observable<{[key : string]: any}> =>
{
    const file = control.value as File;
    const fileReader = new FileReader();
    const frObs = Observable.create((observer: Observer <{[key : string] : any}>)=>{
        fileReader.addEventListener("loadend", ()=>
        {
const arr = new Uint8Array(fileReader.result ).subarray(0,4);
let header = "";
for (let i =0;i < arr.length ;i++)
{
    header += arr[i].toString(16);
}
switch(header){
case "89504e47":
    isValid = true;6
}
        })
        fileReader.readAsArrayBuffer(file);
    })
}