import { Component, inject, signal } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../Model/class/Student';
import { CardComponent } from '../../../reusable/component/card/card.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Constant } from '../../../Constant/Constant';
import { CustomPipe } from '../../../pipe/custom.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-students',
  imports: [ReactiveFormsModule, CustomPipe, RouterLink],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list..component.scss',
})
export class StudentsListComponent {
  studentService = inject(StudentService);

  requiredMessage: string = "This Is Required";
  studentData: Student[] = [];
  isEditMode: boolean = false;
  isSubmittedForm: boolean = false;
  isDataLoading = false;
  modalFormInputs = Constant.modalForm;

  studForm: FormGroup = new FormGroup({});

  constructor() {
    this.loadStudentsData();
    this.studForm = this.studentService.studentForm;
  }

  loadStudentsData() {
    this.isDataLoading = true;
    this.studentService.getAllStudent().subscribe((students: Student[]) => {
      if (students) {
        this.studentData = students;
      }
      this.isDataLoading = false;
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

    this.isDataLoading = true;

    if (this.isEditMode && studid) {
      this.studentService
        .updateStudentDetail(studid, formData)
        .subscribe(() => {
          this.loadStudentsData();
          this.closeModal();
          this.isDataLoading = false;
          setTimeout(() => {
            alert('Student data has been updated');
          }, 500);
        });
    } else {
      /// why studid is null
      this.isDataLoading = true;
      formData.studid = 0;
      this.studentService.createStudent(formData).subscribe(() => {
        this.loadStudentsData();
        this.closeModal();
        this.isDataLoading = false;
        setTimeout(() => {
          alert('Student created');
        }, 500);
        //
      });
    }
  }

  onDeleteStudent(studid: number) {
    this.studentService.deleteStudent(studid).subscribe((response) => {
      this.loadStudentsData();
    });
  }
}
