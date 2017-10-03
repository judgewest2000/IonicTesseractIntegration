import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, Loading, LoadingController } from 'ionic-angular';

import Tesseract from 'tesseract.js';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('testimage') testImage: ElementRef;

  processedText = new FormControl('');

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController) {

  }

  loading = (() => {
    let loadMessage: Loading;

    return {
      turnOn: () => {
        loadMessage = this.loadingCtrl.create({
          content: 'Please Wait, doing something awesome'
        });
        loadMessage.present();
      },
      turnOff: () => loadMessage.dismiss()
    };

  })();

  process() {

    let loading = this.loading;

    loading.turnOn();

    const element = this.testImage.nativeElement as HTMLImageElement;

    let processedText = this.processedText;


    Tesseract.recognize(element)
      .then(function (result: { text: string }) {
        processedText.setValue(result.text);
        console.log(result)
        loading.turnOff();
      })
  }

}
