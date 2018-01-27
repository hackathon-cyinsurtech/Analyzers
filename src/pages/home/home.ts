import { Component } from '@angular/core';

import {Config, NavController,AlertController} from 'ionic-angular';
import {ItemService} from '../../providers/item-service-mock';
import { Injectable } from '@angular/core';
@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public service: ItemService,
              public config: Config,
              public alertCtrl: AlertController) {

  }

  openAd(){
      
  }


}
