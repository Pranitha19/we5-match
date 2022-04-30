import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListRoutingModule } from './courseList-routing.module';
import { CourseListComponent } from './courseList.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
    imports: [
    	CommonModule,
    	CourseListRoutingModule,
    	PageHeaderModule,
    	NgbModule,
    	FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        DataTablesModule,
        NgxSpinnerModule
    ],
    declarations: [CourseListComponent]
})

export class CourseListModule {}
