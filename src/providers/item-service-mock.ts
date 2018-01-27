import {Injectable} from '@angular/core';
import {AlertController} from 'ionic-angular';
import items from './mock-items';
import {Http, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
@Injectable()
export class ItemService {

  favoriteCounter: number = 0;
  favorites: Array<any> = [];
  public items: Array<any>;
  public nearbyItems: Array<any>;
  public lat: number;
  public long: number;
  constructor(public http: Http,public alertCtrl: AlertController) {}

  getNearby(lat:number, long:number){
    return this.http.get("https://nfjywcqtn6.execute-api.eu-west-1.amazonaws.com/beta/closest?lat=" +lat + "&" + "lng=" + long + "&k=4");
  }

  getAllItems(){
    return this.http.get("https://nfjywcqtn6.execute-api.eu-west-1.amazonaws.com/beta/all");
  }

  findAll() {
   // this.doAlert("Error!","ERRPR");
    this.getAllItems().subscribe(data => {
        this.items = data.json();
         this.doAlert("Error!",JSON.stringify(this.items));
        }, error => {
            this.doAlert("Error!",JSON.stringify(error));
      });
    return this.items;
  }

  findById(id) {
    return Promise.resolve(items[id - 1]);
  }

  findByName(searchKey: string) {
    let key: string = searchKey.toUpperCase();
    return Promise.resolve(this.items.filter( (item: any) => (item[1] +  ' ' +item[3] ).toUpperCase().indexOf(key) > -1));
        // (item.title +  ' ' +item.address +  ' ' + item.city + ' ' + item.description).toUpperCase().indexOf(key) > -1));

  }

  getFavorites() {
    return Promise.resolve(this.favorites);
  }

  favorite(item) {
    this.favoriteCounter = this.favoriteCounter + 1;
    this.favorites.push({id: this.favoriteCounter, item: item});
    return Promise.resolve();
  }

  unfavorite(favorite) {
    let index = this.favorites.indexOf(favorite);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
    return Promise.resolve();
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
