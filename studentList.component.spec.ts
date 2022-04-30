import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentListComponent } from './studentList.component';
import { StudentListModule } from './studentList.module';

describe('StudentListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StudentListModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(StudentListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
