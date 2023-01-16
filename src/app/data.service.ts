import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  rowData$?: Observable<any[]>;
  getEmployeeData() {
    return this.http.get<any[]>(
      'https://fastapi-faker-data-app.onrender.com/v1/accounts/all'
    );
  }

  constructor(private http: HttpClient) {}
}
