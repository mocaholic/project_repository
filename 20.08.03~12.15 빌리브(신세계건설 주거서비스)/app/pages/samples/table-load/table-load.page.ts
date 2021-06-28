import {Component, OnInit, TemplateRef} from '@angular/core';
import {SampleService} from "../../../core/service/sample/sample.service";

@Component({
    selector: 'table-load',
    templateUrl: './table-load.page.html',
    styleUrls: ['./table-load.page.scss'],
})
export class TableLoadPage implements OnInit {

    constructor(private service: SampleService) {

    }

    dataList: Array<Object> = [];

    columns = [];

    // columns: Object = {
    //   id:        {title: '아이디', type: 'custom', renderComponent: RenderAsCenter, class: 'smt-header'},
    //   firstName: {title: '성명', type: 'custom', renderComponent: RenderAsCenter, class: 'smt-header'},
    //   lastName:  {title: '이메일주소', type: 'text', class: 'smt-header'},
    //   username:  {title: '나이', type: 'custom', renderComponent: RenderAsCenter, class: 'smt-header'},
    //   email:     {title: '동', type: 'custom', renderComponent: RenderAsCenter, class: 'smt-header'},
    //   age:       {title: '호수', type: 'custom', renderComponent: RenderAsCenter, class: 'smt-header'},
    //   sil:       {title: '실번호', type: 'custom', renderComponent: RenderAsCenter, class: 'smt-header'},
    //   price:       {title: '가격', type: 'custom', renderComponent: RenderAsNumber, class: 'smt-header'},
    // };

    ngOnInit() {

        // this.columns.push({dataField: 'id', caption: '아이디'});
        // this.columns.push({dataField: 'name', caption: '이름'});
        // this.columns.push({dataField: 'email', caption: '이메일'});
        // this.columns.push({dataField: 'age', caption: '나이'});
        // this.columns.push({dataField: 'dongNo', caption: '동번호', dataType: 'number'});
        // this.columns.push({dataField: 'hoNo', caption: '호수번호', dataType: 'number'});
        // this.columns.push({dataField: 'silNo', caption: '실번호', dataType: 'number'});
        // this.columns.push({dataField: 'price', caption: '가격', dataType: 'number', format: "0,###"});

    }

    onDataLoading(): void {

        const params: any = {};
        this.service.loadTableData(params)
            .then((model) => {
                this.dataList = model.result as Array<Object>;
                console.log('this.dataList');
                console.log(this.dataList);


            });
    }

    onClickDataDelete(): void {
        this.dataList = [];
    }

    onClickDataAdd(): void {

        const newObj = {"id": "seaoh2", "name": "오세천", "email": "seaoh@wdfall.com", "age": "42세", "dongNo": "303", "hoNo": "1002", "silNo": "1", "price": 300000};
        this.dataList.push(newObj);
    }


}
