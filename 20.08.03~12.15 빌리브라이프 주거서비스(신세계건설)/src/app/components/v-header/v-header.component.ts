import {Component, Input, OnInit} from '@angular/core';

/**
 * 공통 헤더
 */
@Component({
  selector: 'v-header',
  templateUrl: './v-header.component.html',
  styleUrls: ['./v-header.component.scss'],
})
export class VHeaderComponent implements OnInit {

  constructor() { }

  @Input("title") title;

  ngOnInit() {}

}
