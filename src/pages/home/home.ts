import { Component } from '@angular/core';

import {Config, NavController,AlertController} from 'ionic-angular';
import { Injectable } from '@angular/core';
@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public config: Config,
              public alertCtrl: AlertController) {

  }

  openAd(){
      
  }


}
