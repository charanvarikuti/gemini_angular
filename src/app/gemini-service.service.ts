import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  public genAi:GoogleGenerativeAI ;
  token:any='';
  constructor(private http: HttpClient) {
    let key=environment.APIKEY
    this.genAi=new GoogleGenerativeAI(key);
   }
   async genText(prompt:string){
    const model = this.genAi.getGenerativeModel({model: "gemini-pro"});
    const result=await model.generateContent(prompt);
    const response=await result.response;
    const txt=response.text();
    console.log(txt);
    return txt;
   }

  //  getnewapi(prompt:string){
  //   this.genAi.apiKey=prompt;
  //  }
}
