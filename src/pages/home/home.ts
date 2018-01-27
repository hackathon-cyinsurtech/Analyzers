import { Component } from '@angular/core';

import {Config, NavController,AlertController} from 'ionic-angular';
import {DescriptionPage} from '../../pages/description/description';
import {ItemService} from '../../providers/item-service-mock';
import {SearchService} from '../../providers/search';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
// import { InfoPage } from '../info/info';

import leaflet from 'leaflet';

@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  allItems : Array<any>;
  items: Array<any>;
  searchKey: string = "";
  viewMode: string = "list"; //by default na deixnei lista
  mapVar;
  markersGroup;
  str="";
  lat : number;
  long : number;
  isenabled:boolean=true;
  constructor(public navCtrl: NavController,
              public service: ItemService,
              public config: Config,
              private searchService: SearchService,
              public alertCtrl: AlertController,
              private geolocation: Geolocation) {

      if (this.service.lat  != undefined || this.service.long  != undefined){
        this.lat = this.service.lat;
        this.long = this.service.long;
        this.findAll();
      }else{
        this.geolocation.getCurrentPosition().then((resp) => {
            this.lat = resp.coords.latitude;
            this.long = resp.coords.longitude;
            this.service.lat = this.lat;
            this.service.long = this.long;
            this.findAll();//epistrefei ola ta items
        })
      }

  }

  openAd(){
      
  }

  openDescriptionPage(item: any) {
      this.navCtrl.push(DescriptionPage, item);
  }

  //idia sinartisi me setFilteredItems
  onInput(event) {

    let key: string = this.searchKey.toUpperCase();
    Promise.resolve(this.allItems.filter( (item: any) => (item[1] +  ' ' +item[3] ).toUpperCase().indexOf(key) > -1))
          .then(data => {
              this.items = data;
              if (this.viewMode === "map") {
                  this.showMarkers();
              }
          })
          .catch(error => alert(JSON.stringify(error)));
  }

  onCancel(event) {
        this.findAll();
  }

  findAll() {
      if (this.service.nearbyItems !== undefined) {
          this.items = this.service.nearbyItems.slice();
          return;
      }
        this.service.getNearby(this.lat,this.long).subscribe(data => {
            this.allItems = data.json();
            this.items = data.json();
            this.service.nearbyItems = data.json();
            }, error => {
                this.doAlert("Error!",JSON.stringify(error));
          });
            /*.then(data =>{
               this.items = data;
               this.doAlert("Error!",JSON.stringify(this.items));
            })
            .catch(error => alert(error));*/
  }

  disableButton(){
      this.isenabled = true;
  }

    showMap() {

        this.isenabled = false;

        var corner1 = leaflet.latLng(34.506991, 32.134189);
        var corner2 = leaflet.latLng(35.840509, 34.721470);
        var myBounds = leaflet.latLngBounds(corner1, corner2);
        setTimeout(() => {
          this.mapVar = leaflet.map("map").setView([this.lat, this.long], 12);
          leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
              bounds : myBounds,
              attribution: 'Tiles &copy; Esri'
          }).addTo(this.mapVar);
          leaflet.circle([this.lat,this.long], 5000).addTo(this.mapVar);
          this.showMarkers();
        })

    }

    showMarkers() {
        if (this.markersGroup) {
            this.mapVar.removeLayer(this.markersGroup);
        }
        this.markersGroup = leaflet.layerGroup([]);
        this.items.forEach(item => {
            if (item[7], item[6]) {
                let marker: any = leaflet.marker([item[7], item[6]]).on('click', event => this.openDescriptionPage(event.target.data));
                marker.data = item;
                this.markersGroup.addLayer(marker);
            }
        });
        this.mapVar.addLayer(this.markersGroup);
    }

    doAlert(title: string, message: string) {

        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

}
