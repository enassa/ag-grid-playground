import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [DataService],
})
export class EmployeeListComponent {
  rowData$?: Observable<any[]>;
  constructor(private dataservice: DataService) {}
  getTableData = () => {
    this.rowData$ = this.dataservice.getEmployeeData();
  };

  ngOnInit() {
    // this.rowData$ = this.dataservice.rowData$;
  }

  columnDefs: any[] = [
    { field: 'name' },
    { field: 'job' },
    { field: 'phone_number' },
    { field: 'company' },
    { field: 'account' },
    { field: 'swift' },
    { field: 'balance' },
    { field: 'code' },
  ];
}
