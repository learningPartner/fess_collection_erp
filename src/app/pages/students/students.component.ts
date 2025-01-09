import { Component, inject } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../Model/class/Student';
import { CardComponent } from '../../reusable/component/card/card.component';

@Component({
  selector: 'app-students',
  imports: [],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  studentService = inject(StudentService);

  studentData: Student[] = [];

  constructor() {
    this.fetchStudents();
    this.openModal();
  }

  fetchStudents() {
    this.studentService.getAllStudent().subscribe((students: Student[]) => {
      if (students) {
        this.studentData = students;
      }
    });
  }

  openModal() {
    let modal = document.getElementById('studentModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
  closeModal() {
    const modal = document.getElementById('studentModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
