import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DropdownModule } from 'primeng/dropdown';
import 'ag-grid-enterprise';
import { CustomComponentsComponent } from './custom-components/custom-components.component';
import { SelectorComponent } from './selector/selector.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
@NgModule({
  declarations: [AppComponent, EmployeeListComponent, CustomComponentsComponent, SelectorComponent, ReactiveFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    HttpClientModule,
    DropdownModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
