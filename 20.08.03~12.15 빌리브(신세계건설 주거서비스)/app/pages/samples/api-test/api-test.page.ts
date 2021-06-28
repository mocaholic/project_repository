import { Component, OnInit } from '@angular/core';
import {MainService} from "../../../core/service/main/main.service";

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.page.html',
  styleUrls: ['./api-test.page.scss'],
})
export class ApiTestPage implements OnInit {

  constructor(private mainService: MainService) { }

  ngOnInit() {

  }

  /**
   * 날씨 정보 조회 테스트
   */
  onWeatherInfo(): void {
    const params: any = {bzCd: '217029'}
    this.mainService.loadWeatherInfo(params);
  }

}
