import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'courseList', loadChildren: () => import('./courseList/courseList.module').then(m => m.CourseListModule) },
            { path: 'teacherList', loadChildren: () => import('./teacherList/teacherList.module').then(m => m.TeacherListModule) },
            { path: 'studentList', loadChildren: () => import('./studentList/studentList.module').then(m => m.StudentListModule) },
            { path: 'gradeList', loadChildren: () => import('./gradeList/gradeList.module').then(m => m.GradeListModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
