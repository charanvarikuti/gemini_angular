import { Component, Inject, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiService } from './gemini-service.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl, } from '@angular/forms';
// import { GeminiService } from './gemini.service';
import { TtsService } from './tts.service'
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
   popup:any;
   apiurl:any
   reqtxt:any;
   urlToShare:any;
   loader:boolean=false
   loader1:boolean=false
   copied:boolean=false;
   initialFlag:boolean=false;
   textToSpeak: string = '';
   speakToogle:boolean=false;
  // geminiService:GeminiService = inject(GeminiService);
  constructor( 
    public http: HttpClient,
    public geminiService:GeminiService,
    public fb: FormBuilder,
    private clipboard: Clipboard,
    private ttsService: TtsService
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
    this.urlToShare='https://yourwebsite.com'
    // this.apiurl=apiUrlToken
  }
  ngOnInit(){
    // this.buildForm()
  }
  sendData(){
    this.loader=true;
    let c=this.form.value.Chat;
    this.reqtxt=this.form.value.Chat;
    this.popup=document.getElementById("inputField");
    // console.log(s)
    this.popup.value="";
    
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
        // this.popup = document.getElementById("popup");
        // this.popup.classList.add("show");

  // Hide the popup after 2 seconds
  // setTimeout(function() {
  //   this.popup.classList.remove("show");
  // }, 2000);
}
  }
  copytoclipboard(text: string){
    this.clipboard.copy(text);  
    this.copied = true; 

    setTimeout(() => {
      this.copied = false;
    }, 1000);
  }
  texttoSpeech(){
    this.speakToogle=true;
    this.ttsService.speak(this.txt);
  }
  stopSpeaking(): void {
    this.speakToogle=false;
    this.ttsService.stopSpeaking();
  }
  shareContent(): void {
    if (navigator.share) {
      navigator.share({
        title: 'Awesome Content',
        text: this.txt,
        url: this.urlToShare,
      })
      .then(() => console.log('Content shared successfully!'))
      .catch((error) => console.error('Error sharing content:', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  }
}
