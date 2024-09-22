import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { InjectionToken } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  public genAi:GoogleGenerativeAI ;
  token:any='';
  constructor(private http: HttpClient) {
    // const { GoogleGenerativeAI } = require("@google/generative-ai");
    this.genAi=new GoogleGenerativeAI('AIzaSyAKDx17fXB_DBeq4HQjae4F4AZ8vvX-Di8');
    // const API_KEY_TOKEN = new InjectionToken<string>('apiKey');
   }
   async genText(prompt:string){
    const model = this.genAi.getGenerativeModel({model: "gemini-pro"});
    const result=await model.generateContent(prompt);
    const response=await result.response;
    const txt=response.text();
    console.log(txt);
    return txt;
   }

   getnewapi(prompt:string){
    this.genAi.apiKey=prompt;
   }
}
