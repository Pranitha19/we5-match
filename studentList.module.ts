import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListRoutingModule } from './studentList-routing.module';
import { StudentListComponent } from './studentList.component';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
    imports: [
    	CommonModule,
    	StudentListRoutingModule,
    	PageHeaderModule,
    	NgbModule,
    	FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        DataTablesModule,
        NgxSpinnerModule
    ],
    declarations: [StudentListComponent]
})

export class StudentListModule {}
