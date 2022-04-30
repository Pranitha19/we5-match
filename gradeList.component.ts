import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-tables',
    templateUrl: './gradeList.component.html',
    styleUrls: ['./gradeList.component.scss'],
    animations: [routerTransition()],
})

export class GradeListComponent implements OnInit {
    gForm : FormGroup;
    aForm : FormGroup;
    submitted = false;
    submitted1 = false;

    cList = [];
    sList = [];
    studId:any;
    formFlag = false;

    constructor(
        public router: Router,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private http: HttpClient,
        private SpinnerService: NgxSpinnerService
    ) { }

    ngOnInit() {
        var loggedRole = sessionStorage.getItem("role");
        if(loggedRole == 'student'){
            this.router.navigate(['/login']);
        }

        this.gForm = this.formBuilder.group({
            student_id: ["", Validators.required],
            course_id: ["", Validators.required],
            grade: ["", Validators.required],
            remark: ["", Validators.required],
        });

        this.aForm = this.formBuilder.group({
            student_id: ["", Validators.required],
            datetime: ["", Validators.required],
            present: ["", Validators.required],
            remark: ["", Validators.required],
        });
        this.getCourseList();
        this.getStudentList();
    }


    onSelectStudent(val){
        this.gForm.controls['student_id'].setValue(val);
        this.aForm.controls['student_id'].setValue(val);
        this.studId = val;
        this.formFlag = true;
        var ths = this;
        for(var i=0; i<this.sList.length; i++){
            if(val == this.sList[i]['enroll_no']){
                var obj = this.sList[i];
                if(obj && obj.payment && obj.payment[0] && obj.payment[0]['course_id'] != undefined){
                    ths.gForm.controls['course_id'].setValue(obj.payment[0]['course_id']);
                    ths.gForm.controls['course_id'].disable();
                }
                break;
            }
        }
    }

    getCourseList(){
        this.http.get(environment.apiBaseUrl+'course/list.php').subscribe(
            res => {
                if(res['status'] == 1){
                    this.cList = res['data'];
                }else{
                    this.toastr.error('Something went wrong');
                }
            },
            error => {
                this.toastr.error(error.error['message']);
            },
        );
    }

    getStudentList(){
        this.http.get(environment.apiBaseUrl+'student/list.php').subscribe(
            res => {
                if(res['status'] == 1){
                    this.sList = res['data'];
                }else{
                    this.toastr.error('Something went wrong');
                }
            },
            error => {
                this.toastr.error(error.error['message']);
            },
        );
    }

    saveGDetail(){
        this.submitted = true;
        if (this.gForm.invalid) {
            return;
        }
        this.SpinnerService.show();
        var apiUrl= environment.apiBaseUrl+'grade/add.php';

        const formData = new FormData();
        formData.append('student_id', this.studId);
        formData.append('course_id', this.gForm.value.course_id);
        formData.append('grade', this.gForm.value.grade);
        formData.append('remark', this.gForm.value.remark);

        this.http.post(apiUrl, formData).subscribe(
            res => {
                this.SpinnerService.hide();
                if(res['status'] == 1){
                    this.gForm.controls['grade'].setValue('');
                    this.gForm.controls['remark'].setValue('');
                    this.gForm.markAsPristine();
                    this.gForm.markAsUntouched();
                    this.gForm.reset();

                    this.toastr.success(res['message']);
                }else{
                    this.toastr.error(res['message']);
                }
            },
            error => {
                this.SpinnerService.hide();
                this.toastr.error(error.error['message']);
            },
        );
    }

    saveADetail(){
        this.submitted1 = true;
        if (this.aForm.invalid) {
            return;
        }
        this.SpinnerService.show();
        var apiUrl= environment.apiBaseUrl+'attendance/add.php';

        const formData = new FormData();
        formData.append('student_id', this.studId);
        formData.append('datetime', this.aForm.value.datetime);
        formData.append('present', this.aForm.value.present);
        formData.append('remark', this.aForm.value.remark);

        this.http.post(apiUrl, formData).subscribe(
            res => {
                this.SpinnerService.hide();
                if(res['status'] == 1){
                    this.aForm.controls['datetime'].setValue('');
                    this.aForm.controls['present'].setValue('');
                    this.aForm.controls['remark'].setValue('');
                    this.aForm.markAsPristine();
                    this.aForm.markAsUntouched();
                    this.aForm.reset();
                    this.toastr.success(res['message']);
                }else{
                    this.toastr.error(res['message']);
                }
            },
            error => {
                this.SpinnerService.hide();
                this.toastr.error(error.error['message']);
            },
        );
    }


    get gval() {
        return this.gForm.controls;
    }

    get aval() {
        return this.aForm.controls;
    }

}
