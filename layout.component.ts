import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    collapedSideBar: boolean;
    displayAdmin: boolean;
    displayVendor: boolean;

    constructor() {}

    ngOnInit() {
        var roleType = sessionStorage.getItem('role');
        if(roleType == 'VD'){
            this.displayAdmin = false;            
            this.displayVendor = true;            
        }else{
            this.displayAdmin = true;            
            this.displayVendor = false;
        }
    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
}
