import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})

export class LoginComponent implements OnInit {
    loginForm : FormGroup;
    submitted = false;

    constructor(
        public router: Router,
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private toastr: ToastrService
    ){ }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
        sessionStorage.removeItem('isLoggedin');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('employee_Id');
        sessionStorage.removeItem('student_Id');
    }

    get fval() {
        return this.loginForm.controls;
    }

    onLoggedin() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        var apiUrl = environment.apiBaseUrl+'login.php';
        const formData = new FormData();
        formData.append('username', this.loginForm.value.username);
        formData.append('password', this.loginForm.value.password);

        this.http.post(apiUrl, formData).subscribe(
            res => {
                if(res['status'] == 1){
                    sessionStorage.setItem('isLoggedin', 'true');
                    sessionStorage.setItem('role', res['data']['role']);
                    sessionStorage.setItem('username', res['data']['username']);
                    if(res['data']['role'] == "employee"){
                        sessionStorage.setItem('employee_Id', res['data']['user_id']);
                    }else if(res['data']['role'] == "student"){
                        sessionStorage.setItem('student_Id', res['data']['user_id']);
                    }
                    this.toastr.success(res['message']);
                    if(res['data']['role'] == "admin" || res['data']['role'] == "employee"){
                        this.router.navigate(['/courseList']);
                    }else{
                        this.router.navigate(['/dashboard']);
                    }
                }else{
                    sessionStorage.setItem('isLoggedin', 'false');
                    this.toastr.error(res['message']);
                }
            },
            error => {
                sessionStorage.setItem('isLoggedin', 'false');
                this.toastr.error(error.error['message']);
            },
        );
    }

}
