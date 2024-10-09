// src/app/services/speech.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  recognition: any;
  isListening: boolean = false;

  constructor() {
    // Check if the browser supports speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US'; // Set the language for recognition
    } else {
      console.error('Browser does not support speech recognition.');
    }
  }

  startListening(callback: (transcript: string) => void) {
    if (this.recognition && !this.isListening) {
      this.isListening = true;
      this.recognition.start();

      this.recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        callback(transcript); // Pass the transcript back to the caller
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event);
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.isListening = false;
      this.recognition.stop();
    }
  }
}
