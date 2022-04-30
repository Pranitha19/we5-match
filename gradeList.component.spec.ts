import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GradeListComponent } from './gradeList.component';
import { GradeListModule } from './gradeList.module';

describe('GradeListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        GradeListModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(GradeListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
