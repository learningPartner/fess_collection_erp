import { Component, inject } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../Model/class/Student';
import { CardComponent } from '../../reusable/component/card/card.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Constant } from '../../Constant/Constant';

@Component({
  selector: 'app-students',
  imports: [ReactiveFormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  studentService = inject(StudentService);

  requiredMessage: string = "This Is Required";
  studentData: Student[] = [];
  isEditMode: boolean = false;
  isSubmittedForm: boolean = false;

  studForm: FormGroup = new FormGroup({});

  constructor() {
    this.loadStudentsData();
    this.studForm = this.studentService.studentForm;
  }

  modalFormInputs = Constant.modalForm;

  loadStudentsData() {
    this.studentService.getAllStudent().subscribe((students: Student[]) => {
      if (students) {
        this.studentData = students;
      }
    });
  }

  openModal(student?: Student) {
    if (student) {
      this.isEditMode = true;
      const studentToEdit = this.studentData.find(
        (stud) => stud.studid === student.studid
      );
      if (studentToEdit) {
        this.studentService.initializeForm(studentToEdit);
        this.studForm.patchValue(studentToEdit);
      }
    } else {
      this.isEditMode = false;
      this.studentService.initializeForm();
      this.studForm.reset();
    }

    const modal = document.getElementById('studentModal');
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

  onSave() {
    const isStudFormValid = this.studForm.valid;
    const formData = this.studForm.value;
    const studid = formData.studid;
    this.isSubmittedForm = true;

    if (this.isEditMode && studid) {
      this.studentService
        .updateStudentDetail(studid, formData)
        .subscribe(() => {
          this.loadStudentsData();
          this.closeModal();
        });
    } else {
      /// why studid is null
      formData.studid = 0;
      this.studentService.createStudent(formData).subscribe(() => {
        alert('student created');
        this.loadStudentsData();
        this.closeModal();
      });
    }
  }

  onDeleteCategory(studid: number) {
    this.studentService.deleteStudent(studid).subscribe((response) => {
      this.loadStudentsData();
    });
  }
}
