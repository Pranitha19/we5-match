import { GradeListModule } from './gradeList.module';

describe('GradeListModule', () => {
	let gradeListModule: GradeListModule;

    beforeEach(() => {
    	gradeListModule = new GradeListModule();
    });

    it('should create an instance', () => {
    	expect(gradeListModule).toBeTruthy();
    });
});
