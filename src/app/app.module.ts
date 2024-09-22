import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeminiService } from './gemini-service.service';
import {  HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { API_URL } from './app.tokens';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot()
    // HttpClient
    // GoogleGenerativeAI
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    GeminiService,
    { provide: API_URL, useValue: 'AIzaSyAKDx17fXB_DBeq4HQjae4F4AZ8vvX' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
