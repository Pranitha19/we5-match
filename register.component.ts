import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    animations: [routerTransition()]
})

export class RegisterComponent implements OnInit {
    studForm : FormGroup;
    teacherForm : FormGroup;
    submitted = false;
    sForm = false;
    tForm = true;
    cList = [];

    constructor(
        public router: Router,
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private toastr: ToastrService,
    ){ }

    ngOnInit() {
        this.getCourseList();
        this.studForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required,Validators.email]],
            username: ['', Validators.required],
            password: ['', Validators.required],
            address: ['', Validators.required],
            gender: ['', Validators.required],
            dob: ['', Validators.required],
            standard: ['', Validators.required],
            phone: ['', Validators.required],
            course: ['', Validators.required],
            amount: ['', Validators.required],
        });

        this.teacherForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required,Validators.email]],
            username: ['', Validators.required],
            password: ['', Validators.required],
            address: ['', Validators.required],
            gender: ['', Validators.required],
            phone: ['', Validators.required],
            role: ['role', Validators.required],
        });
    }

    getCourseList() {
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

    get sval() {
        return this.studForm.controls;
    }

    get tval() {
        return this.teacherForm.controls;
    }

    onRegisterType(val){
        if(val == 'student'){
            this.sForm = true;
            this.tForm = false;
        }else if(val == 'teacher'){
            this.tForm = true;
            this.sForm = false;
        }
    }

    onCourseSelect(val){
        var ths = this;
        for(var i=0; i < this.cList.length; i++){
            var data = this.cList[i]
            if(val == data.course_id){
                ths.studForm.controls['amount'].setValue(data.fee);
                break;
            }
        }
    }

    saveDetail(val){
        this.submitted = true;
        var apiUrl = '';
        const formData = new FormData();

        if(val == 'student'){
            apiUrl = environment.apiBaseUrl+'student/add.php';
            if (this.studForm.invalid) {
                return;
            }

            formData.append('name', this.studForm.value.name);
            formData.append('email', this.studForm.value.email);
            formData.append('username', this.studForm.value.username);
            formData.append('password', this.studForm.value.password);
            formData.append('address', this.studForm.value.address);
            formData.append('gender', this.studForm.value.gender);
            formData.append('dob', this.studForm.value.dob);
            formData.append('standard', this.studForm.value.standard);
            formData.append('phone', this.studForm.value.phone);
            formData.append('course', this.studForm.value.course);
            formData.append('amount', this.studForm.value.amount);
        }else if(val == 'teacher'){
            apiUrl = environment.apiBaseUrl+'employee/add.php';
            if (this.teacherForm.invalid) {
                return;
            }

            formData.append('name', this.teacherForm.value.name);
            formData.append('email', this.teacherForm.value.email);
            formData.append('username', this.teacherForm.value.username);
            formData.append('password', this.teacherForm.value.password);
            formData.append('address', this.teacherForm.value.address);
            formData.append('gender', this.teacherForm.value.gender);
            formData.append('phone', this.teacherForm.value.phone);
            formData.append('role', this.teacherForm.value.role);
        }

        this.http.post(apiUrl, formData).subscribe(
            res => {
                if(res['status'] == 1){
                    this.toastr.success(res['message']);
                    this.router.navigate(['/login']);
                    // this.studForm.markAsPristine();
                    // this.studForm.markAsUntouched();
                    // this.studForm.reset();
                    // this.teacherForm.markAsPristine();
                    // this.teacherForm.markAsUntouched();
                    // this.teacherForm.reset();
                }else{
                    this.toastr.error(res['message']);
                }
            },
            error => {
                this.toastr.error(error.error['message']);
            },
        );
    }

}
