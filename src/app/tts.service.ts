import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TtsService {
  private synth = window.speechSynthesis;

  constructor() {}

  // Function to convert text to speech
  speak(text: string): void {
    if (this.synth.speaking) {
      console.error('SpeechSynthesis is already speaking.');
      return;
    }

    if (text !== '') {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        console.log('SpeechSynthesisUtterance finished speaking.');
      };

      utterance.onerror = (event) => {
        console.error('SpeechSynthesisUtterance error:', event.error);
      };

      // Set optional parameters like voice, pitch, rate, etc.
      utterance.pitch = 1; // default pitch
      utterance.rate = 1; // default rate
      this.synth.speak(utterance);
    }
  }

  // Stop speaking
  stopSpeaking(): void {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
  }
}
