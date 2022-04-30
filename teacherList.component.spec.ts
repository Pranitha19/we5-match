import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherListComponent } from './teacherList.component';
import { TeacherListModule } from './teacherList.module';

describe('TeacherListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        TeacherListModule, 
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(TeacherListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
