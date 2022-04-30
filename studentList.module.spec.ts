import { StudentListModule } from './studentList.module';

describe('StudentListModule', () => {
	let studentListModule: StudentListModule;

    beforeEach(() => {
    	studentListModule = new StudentListModule();
    });

    it('should create an instance', () => {
    	expect(studentListModule).toBeTruthy();
    });
});
