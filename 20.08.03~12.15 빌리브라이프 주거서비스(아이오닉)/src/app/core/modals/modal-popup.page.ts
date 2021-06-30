import { Component, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

/**
 * 모바일 일때 이미지 줌을 위한 팝업
 * */
@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.page.html',
  styleUrls: ['./modal-popup.page.scss'],
})

export class ModalPopupPage {
  @Input() name: string;

  imagePath: string;
  constructor(
      public navParams: NavParams,
      public modalCtrl: ModalController
  ) {
    this.imagePath = navParams.get('imagePath');
  }

  public closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
