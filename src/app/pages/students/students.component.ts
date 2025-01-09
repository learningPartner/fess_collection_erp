import { Component, inject } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../Model/class/Student';
import { CardComponent } from '../../reusable/component/card/card.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  imports: [ReactiveFormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  studentService = inject(StudentService);

  studentData: Student[] = [];

  from: FormGroup = new FormGroup({});


  constructor() {
    this.fetchStudents();
    this.openModal();
    this.from = this.studentService.studentForm;
    debugger;
  }

  onSave() {
    debugger;
    this.studentService.createStudent().subscribe((res:any)=>{
      
    });
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
