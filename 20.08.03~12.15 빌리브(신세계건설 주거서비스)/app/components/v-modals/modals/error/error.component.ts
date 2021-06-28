import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalEventModel} from "../../../../core/models/modal-event-model";

@Component({
  selector: 'v-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {

  constructor() { }

  _popupInfo: ModalEventModel;

  isActive: boolean = false;

  @Input()
  get popupInfo() {
    return this._popupInfo;
  }
  set popupInfo(_popupInfo) {
    this._popupInfo = _popupInfo;
    this.isActive = true;
  }

  @Output() confirmEvent = new EventEmitter<ModalEventModel>();

  ngOnInit() {

  }

  onClick() {

    this.isActive = false;

    setTimeout( () => {
      this.confirmEvent.emit(this._popupInfo);
    }, 300);

  }
}
