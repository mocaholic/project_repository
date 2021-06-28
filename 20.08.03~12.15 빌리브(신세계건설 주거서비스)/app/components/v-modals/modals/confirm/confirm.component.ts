import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalEventModel} from "../../../../core/models/modal-event-model";

@Component({
  selector: 'v-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {

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

  onClick(isCancel) {

    this.isActive = false;

    setTimeout( () => {
      this._popupInfo.isCancel = isCancel;
      this.confirmEvent.emit(this._popupInfo);
    }, 300);


  }
}
