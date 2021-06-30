import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-menu',
  templateUrl: './my-menu.page.html',
  styleUrls: ['../../../pages/my-page/my-menu/my-menu.page.scss'],
})
export class MyMenuPage implements OnInit {

  constructor() {}

  ngOnInit() {
  }
  accessories = ['test', 'test1', 'test2'];

  reorder({detail}) {

    const itemMove = this.accessories.splice(detail.from, 1)[0];
    this.accessories.splice(detail.to, 0, itemMove);
    detail.complete(true);
  }

}
