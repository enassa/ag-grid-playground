import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
interface MyComoponent {
  balance: number;
}
@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css'],
})
export class SelectorComponent implements ICellRendererAngularComp {
  param: number = 0;
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }
  agInit(params: ICellRendererParams<any, any> & MyComoponent): void {
    this.param = params.balance;
  }
}
