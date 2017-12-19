import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SamplePage } from '../sample/sample';
import { DictPage } from '../dict/dict';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  navigateToSamplePage()
  {
    this.navCtrl.push(SamplePage);
  }

  navigateToDictPage()
  {
    this.navCtrl.push(DictPage);
  }
   

}
