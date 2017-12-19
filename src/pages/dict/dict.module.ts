import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DictPage } from './dict';

@NgModule({
  declarations: [
    DictPage,
  ],
  imports: [
    IonicPageModule.forChild(DictPage),
  ],
})
export class DictPageModule {}
