import { Component } from '@angular/core';

import {Config, NavController,AlertController,NavParams} from 'ionic-angular';
import {DescriptionPage} from '../../pages/description/description';
import {ItemService} from '../../providers/item-service-mock';
import {SearchService} from '../../providers/search';
import { Injectable } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import { InfoPage } from '../info/info';

import leaflet from 'leaflet';

@Injectable()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  typeOfInsurance: String;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public service: ItemService,
              public config: Config,
              private searchService: SearchService,
              public alertCtrl: AlertController,
              private geolocation: Geolocation,
              public actionSheetCtrl: ActionSheetController) {


  }

 

}
