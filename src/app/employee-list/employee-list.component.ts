import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { DropOptions } from './../models/index';
import { ColDef, GridOptions, ICellRendererParams } from 'ag-grid-community';
import { CustomComponentsComponent } from './../custom-components/custom-components.component';
import { SelectorComponent } from './../selector/selector.component';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [DataService],
})
export class EmployeeListComponent {
  tableData?: any[];
  rowData?: any[];
  groupDisplayType: any = 'multipleColumns';
  rowGroupPanelShow: any = 'always';
  dropOptions: DropOptions[] = [
    { label: 'Normal' },
    { label: 'Swift with 4Xs' },
    { label: 'Account less than or equal to 14 digits' },
    { label: 'Phone number containing x' },
  ];
  constructor(private dataservice: DataService) {}
  regions = [
    'Greater Accra',
    'Central Region',
    'Northen Region',
    'Ashanti Region',
    'Eastern Region',
    'Western Region',
    'Brong-Ahafo Region',
    'Upper West region',
  ];

  getTableData = () => {
    this.dataservice.getEmployeeData().subscribe((response) => {
      this.tableData = response.map((item, index) => {
        const randIndex = Math.floor(Math.random() * 8);
        const region = this.regions[randIndex];

        return index % 2 === 0
          ? { country: 'Ghana', region: region + '-' + randIndex, ...item }
          : { country: 'USA', region: region + '-' + randIndex, ...item };
      });
      if (this.tableData) this.rowData = this.tableData;
    });
  };

  defaultColDef: any = {
    sortable: true,
    minWidth: 500,
    resizable: true,
  };
  gridOptions: GridOptions = {
    pagination: true,
    defaultColDef: this.defaultColDef,
    groupDisplayType: 'multipleColumns', //single, groupRows, cust   om
    //When using groupRows, autoColumnDef is not used so you must use groupRenderer
    // and groupRenderParams to configue the group cell display, group Rows are used when we want the group names to display some really long info
    // groupRowRenderer: 'agGroupCellRenderer',
    // groupRowRendererParams: {
    //   suppressCount: true,
    //   innerRenderer: (param: { value: string }) =>
    //     '<button style="color:red; border:0px; padding:5px 10px; border-radius:20px; cursor:pointer">' +
    //     param.value +
    //     '</button>',
    // },
    // showOpenedGroup: true,
    // groupHideOpenParents: true, //prevent expanded group from displaying below
    sideBar: true,
    suppressDragLeaveHidesColumns: true,
    suppressMakeColumnVisibleAfterUnGroup: true,
  };
  autoGroupColumnDef = {
    // headerName: ' CUSTOM! ',
    minWidth: 200,
    cellRendererParams: {
      suppressCount: true,
      checkbox: true,
      innerRenderer: (param: { value: string }) =>
        '<button style="color:red; border:0px; padding:5px 10px; border-radius:20px; cursor:pointer">' +
        param.value +
        '</button>',
    },
  };
  printSlectedColumns = () => {
    const cols = this.gridOptions.columnApi?.getAllGridColumns();
    console.log(cols, '--');
  };
  filterData = (filterOption: Event) => {
    console.log(this.rowData?.length);
    const value = (<HTMLSelectElement>filterOption.target).value;
    switch (value) {
      case 'Normal':
        this.rowData = this.tableData;
        break;

      case 'Swift with 4Xs':
        this.rowData = this.tableData?.filter(
          (item: any) => (item.swift.match(/X/g) || []).length === 4
        );
        break;

      case 'Account less than or equal to 14 digits':
        this.rowData = this.tableData?.filter(
          (item) => item.account.length <= 14
        );
        console.log(this.rowData?.length);
        break;

      case 'Phone number containing x':
        this.rowData = this.tableData?.filter((item) =>
          item.phone_number.includes('x')
        );
        break;

      default:
        break;
    }
  };

  ngOnInit() {
    this.getTableData();
    // this.rowData$ = this.dataservice.rowData$;
  }

  columnDefs: any[] = [
    {
      field: 'country',
      filter: true,
      // rowGroup: true,
      // rowGroupIndex: 0,
      enableRowGroup: true,
      cellRenderer: CustomComponentsComponent,
      // hide: true,
    },

    {
      field: 'region',
      // rowGroupIndex: 1,
      // hide: true,
      enableRowGroup: true,
    },
    { field: 'name', enableRowGroup: true },
    { field: 'job' },
    { field: 'phone_number' },
    { field: 'company' },
    { field: 'account' },
    { field: 'swift' },
    {
      field: 'balance',
      cellRendererSelector: (params: ICellRendererParams) => {
        const numb = parseFloat(params.value.substring(1).split(',').join(''));
        return {
          component: SelectorComponent,
          params: {
            balance: numb,
          },
        };
      },
    },
    { field: 'code' },
  ];
}
// enableRowGroup: true,  what does this do ?
// ability  to drag to row group panel
