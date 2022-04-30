import { TeacherListModule } from './teacherList.module';

describe('TeacherListModule', () => {
	let teacherListModule: TeacherListModule;

    beforeEach(() => {
    	teacherListModule = new TeacherListModule();
    });

    it('should create an instance', () => {
    	expect(teacherListModule).toBeTruthy();
    });
});
