import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-custom-components',
  templateUrl: './custom-components.component.html',
  styleUrls: ['./custom-components.component.css'],
})
export class CustomComponentsComponent implements ICellRendererAngularComp {
  cellValue?: string;
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }
  agInit(params: ICellRendererParams<any, any>): void {
    this.cellValue = params.value;
  }
  ngOnInit(): void {}
}
