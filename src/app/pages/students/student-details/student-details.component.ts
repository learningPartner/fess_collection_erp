import { Component, inject } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../Model/interface/Student';

@Component({
  selector: 'app-student-details',
  imports: [],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss',
})
export class StudentDetailsComponent {
  studentService = inject(StudentService);
  studentData: Student[] = [];

  constructor() {
    this.loadStudentsDetails();
  }

  loadStudentsDetails() {
    this.studentService
      .getAllStudentDetail()
      .subscribe((students: Student[]) => {
        if (students) {
          console.log(students);
          this.studentData = students;
        }
      });
  }
}
