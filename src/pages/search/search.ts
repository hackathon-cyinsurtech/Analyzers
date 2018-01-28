import { Component } from '@angular/core';

import {Config, NavController,AlertController,NavParams} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
// import { InfoPage } from '../info/info';

@Injectable()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  typeOfInsurance: String;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public config: Config,
              public alertCtrl: AlertController,
              public actionSheetCtrl: ActionSheetController) {


  }

 

}
