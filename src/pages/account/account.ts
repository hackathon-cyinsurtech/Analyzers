import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';


@Component({
  templateUrl: 'account-details.html',
})
export class NavigationDetailsPage {
  item;

  constructor(params: NavParams) {
    this.item = params.data.item;
  }
}

@Component({
  template: `
<ion-header>
  <ion-navbar>
    <ion-title>My Account</ion-title>
  </ion-navbar>
</ion-header>
<ion-content>
  <ion-list>
    <button ion-item *ngFor="let item of items" (click)="openNavDetailsPage(item)" icon-start>
      <ion-icon [name]="item.icon" item-start></ion-icon>
      {{ item.title }}
    </button>
  </ion-list>
</ion-content>
`
})
export class AccountPage {
  items = [];

  constructor(public nav: NavController) {
    this.items = [
      {
        'title': 'My Information',
        'icon': 'information-circle',
        'description': {
            'Name' : 'Konstantinos'
        }
      },
      {
        'title': 'My Insurances',
        'icon': 'document',
        'description': 'The latest version of cascading stylesheets - the styling language of the web!'
      },
      {
        'title': 'My Claims',
        'icon': 'filing',
        'description': 'The latest version of the web\'s markup language.'
      },
      {
        'title': 'Contact insurance',
        'icon': 'call',
        'description': 'One of the most popular programming languages on the Web!'
      },
      {
        'title': 'Settings',
        'icon': 'settings',
        'description': 'Syntactically Awesome Stylesheets - a mature, stable, and powerful professional grade CSS extension.'
      },
      {
        'title': 'Privacy Policy',
        'icon': 'lock',
        'description': 'An open-source, cross-platform runtime environment for developing server-side Web applications.'
      },
      {
        'title': 'Terms of Use',
        'icon': 'book',
        'description': 'A clear and powerful object-oriented programming language!'
      }
    ]
  }

  openNavDetailsPage(item) {
    this.nav.push(NavigationDetailsPage, { item: item });
  }

}