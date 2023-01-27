import { Component, OnInit } from '@angular/core';
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
export class EmployeeListComponent implements OnInit {
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
        const state = () => {
          const randValue = Math.random() * 11;
          if (randValue <= 3) {
            return 'deleted';
          } else if (randValue > 3 && randValue < 7) {
            return 'updated';
          } else return 'noUpdate';
        };
        const newObj = {
          country: '',
          region: '',
          name: item.name,
          job: item.job,
          phoneNumber: item.phone_number,
          company: item.company,
          account: item.account,
          swift: item.swift,
          code: item.code,
          state: state(),
          balance: item.balance,
        };
        return index % 2 === 0
          ? {
              country: 'Ghana',
              region: region,
              name: item.name,
              job: item.job,
              phoneNumber: item.phone_number,
              company: item.company,
              account: item.account,
              swift: item.swift,
              code: item.code,
              state: state(),
              balance: item.balance,
            }
          : {
              country: 'USA',
              region: region,
              name: item.name,
              job: item.job,
              phoneNumber: item.phone_number,
              company: item.company,
              account: item.account,
              swift: item.swift,
              code: item.code,
              state: false,
              balance: item.balance,
            };
      });
      if (this.tableData) this.rowData = this.tableData;
    });
  };

  defaultColDef: any = {
    sortable: true,
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
    // suppressDragLeaveHidesColumns: true,
    // suppressMakeColumnVisibleAfterUnGroup: true,
  };
  autoGroupColumnDef = {
    // headerName: ' CUSTOM! ',
    minWidth: 200,
    cellRendererParams: {
      suppressCount: true,
      checkbox: true,
      innerRenderer: (param: { value: string }) =>
        '<button style="color:white; border:0px; padding:5px 10px; border-radius:20px; cursor:pointer">' +
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
  getRowClass = (params: any) => '';
  ngOnInit() {
    this.getTableData();
    this.getRowClass = (params: any): any => {
      console.log(params.data);
      return params.data?.state === 'deleted'
        ? 'deleted-row'
        : params.data?.state === 'updated'
        ? 'updated-row'
        : 'unchanged-row';
    };

    // this.rowData$ = this.dataservice.rowData$;
  }

  columnDefs: any[] = [
    {
      field: 'country',
      filter: true,
      enableRowGroup: true,
      // cellRenderer: CustomComponentsComponent,
    },
    {
      field: 'region',
      enableRowGroup: true,
    },

    {
      field: 'name',
    },
    { field: 'job' },
    { field: 'phoneNumber' },
    { field: 'company' },
    { field: 'account' },
    { field: 'swift' },

    {
      field: 'state',
      headerClass: 'text-red-400',
      // width: 50,
      cellClass: (param: any): any => {
        if (param.value === undefined) return;

        // return param.value === true ? 'minus-icon' : 'plus-icon';
        return param.value === 'deleted'
          ? 'minus-icon'
          : param.value === 'updated'
          ? 'plus-icon'
          : 'no-icon';
      },
    },
    {
      field: 'balance',
      cellClass: (param: any): any => {
        if (param.value === undefined) return;
        const numb = parseFloat(param.value?.substring(1).split(',').join(''));
        return numb > 5000 && numb < 10000
          ? 'no-triangle'
          : numb > 10000
          ? 'red-triangle'
          : 'green-triangle';
      },
      // cellRendererSelector: (params: ICellRendererParams) => {
      //   const numb = parseFloat(params.value.substring(1).split(',').join(''));

      //   return {
      //     component: SelectorComponent,
      //     params: {
      //       balance: numb,
      //     },
      //   };
      // },
    },
    { field: 'code' },
  ];
}
