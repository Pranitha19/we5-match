import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()],
})

export class DashboardComponent implements OnInit {
    public studData = {};

    detailForm : FormGroup;
    submitted = false;

    constructor(
        public router: Router,
        private toastr: ToastrService,
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private SpinnerService: NgxSpinnerService
    ) { }


    ngOnInit() {
        var loggedRole = sessionStorage.getItem("role");
        if(loggedRole == 'admin' || loggedRole == 'employee'){
            this.router.navigate(['/login']);
        }

        this.detailForm = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required],
            address: ['', Validators.required],
            gender: ['', Validators.required],
            dob: ['', Validators.required],
            phone: ['', Validators.required],
        });

        this.listGetData();
    }


    listGetData(){
        this.SpinnerService.show();
        var apiUrl= environment.apiBaseUrl+'student/profile.php';
        const formData = new FormData();
        formData.append('student_id', sessionStorage.getItem('student_Id'));

        this.http.post(apiUrl, formData).subscribe(
            res => {
                this.SpinnerService.hide();
                if(res['status'] == 1){
                    this.studData = res['data'];
                    this.setProfileValue();
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

    setProfileValue(){
        this.detailForm.controls['name'].setValue(this.studData['details']['name']);
        this.detailForm.controls['address'].setValue(this.studData['details']['address']);
        this.detailForm.controls['gender'].setValue(this.studData['details']['gender']);
        this.detailForm.controls['dob'].setValue(this.studData['details']['dob']);
        this.detailForm.controls['phone'].setValue(this.studData['details']['phone']);
    }


    get fval() {
        return this.detailForm.controls;
    }


    saveDetail(){
        this.submitted = true;
        if (this.detailForm.invalid) {
            return;
        }
        this.SpinnerService.show();
        var apiUrl = environment.apiBaseUrl+'student/edit.php';

        const formData = new FormData();
        formData.append('name', this.detailForm.value.name);
        formData.append('password', this.detailForm.value.password);
        formData.append('address', this.detailForm.value.address);
        formData.append('gender', this.detailForm.value.gender);
        formData.append('dob', this.detailForm.value.dob);
        formData.append('phone', this.detailForm.value.phone);
        formData.append('standard', this.studData['details']['standard']);
        formData.append('student_id', this.studData['details']['enroll_no']);


        this.http.post(apiUrl, formData).subscribe(
            res => {
                this.SpinnerService.hide();
                if(res['status'] == 1){
                    this.listGetData();
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


}
