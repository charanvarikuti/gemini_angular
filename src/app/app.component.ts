import { Component, Inject, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiService } from './gemini-service.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
// import { GeminiService } from './gemini.service';
import { API_URL } from './app.tokens';
import { from } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'geminidemo';
   form: FormGroup
   txt:any
   apiurl:any
   reqtxt:any;
   loader:boolean=false
   loader1:boolean=false
   copied:boolean=false;
   initialFlag:boolean=false;
  // geminiService:GeminiService = inject(GeminiService);
  constructor( 
    public http: HttpClient,
    public geminiService:GeminiService,
    public fb: FormBuilder,
    private clipboard: Clipboard
    // @Inject(API_URL) private apiUrlToken: string
  )
  {
    this.form = this.fb.group({
      Chat: ['', [Validators.required]],
     
    });
    this.txt="Ask V"
    if(this.txt=="Ask V"){
      this.initialFlag=false
    }
    // this.apiurl=apiUrlToken
  }
  ngOnInit(){
    // this.buildForm()
  }
  sendData(){
    this.loader=true;
    let c=this.form.value.Chat;
    this.reqtxt=this.form.value.Chat;
    if(c==""){
      this.loader=false;
      this.txt="Please enter the Info to Continue"
    }else{
      this.loader=true;
      this.loader1=true

      from(this.geminiService.genText(c)).subscribe(u => 
        {
          this.loader=false
          this.txt = u
          this.initialFlag=true
          setTimeout(() => {
            this.loader1=false
          }, 1000);
        });
    }
  }
  copytoclipboard(text: string){
    this.clipboard.copy(text);  
    this.copied = true; 

    setTimeout(() => {
      this.copied = false;
    }, 1000);
  }
 
}
