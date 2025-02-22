import { Component, inject } from '@angular/core';
import { EnrollmentService } from '../../services/enrollment.service';
import { ICreateEnrollment, IGetEnrollments } from '../../Model/interface/enrollments';
import { DatePipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BatchService } from '../../services/batch.service';
import { IBatch } from '../../Model/interface/batch';
import { ActivatedRoute } from '@angular/router';
import { Batch } from '../../Model/class/batch';
import { StudentService } from '../../services/student.service';
import { Student } from '../../Model/interface/Student';

@Component({
  selector: 'app-enrollments',
  imports: [ReactiveFormsModule, NgIf, FormsModule, NgClass, NgFor],
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss',
})
export class EnrollmentsComponent {
  enrollmentService = inject(EnrollmentService);
  totalEnrollment: IGetEnrollments[] = [];
  totalBatches: IBatch[] = [];
  isLoading = false;
  isEditMode: boolean = false
  batchService = inject(BatchService);
  formBuilder = inject(FormBuilder);
  batchForm: FormGroup;
  batchData: IBatch[] = []
  batchId: any;
  showEnrollmentForm: boolean = false;
  isFetching: boolean = false;
  isUpdating: boolean = false;
  selectedStudentId: string = '';
  students: Student[] = [];
  enrollmentForm!: FormGroup
  constructor(private route: ActivatedRoute, private studentService: StudentService) {
    this.getRecentEnrollments();

    this.batchForm = this.formBuilder.group({
      batchId: [''],
      batchName: [''],
      startDate: [''],
      teacher: [''],
      endDate: ['']
    });

    this.enrollmentForm = this.formBuilder.group({
      enrollId: [''],
      studid: [''],
      batchId: [''],
      totalFees: [''],
      narration: [''],
      enrollDate: [''],
      discount: ['']
    })
  }

  ngOnInit(): void {
    // Get batchId from route parameters
    this.batchId = Number(this.route.snapshot.paramMap.get('batchid'));
    console.log('BatchId:', this.batchId);
    if (this.batchId && this.batchId !== 0) {
      this.isEditMode = true;
      this.getBatchDetails(this.batchId);
    } else {
      this.isEditMode = false;
      console.log('Creating new batch');
    }

  }

  getBatchDetails(batchId: number): void {
    this.isFetching = true;
    this.batchService.getBatchById(batchId).subscribe({
      next: (data: any) => {
        if (data) {
          this.batchForm.patchValue({
            batchId: data.batchId,
            batchName: data.batchName,
            teacher: data.teacher,
            startDate: data.startDate.split('T')[0],
            endDate: data.endDate.split('T')[0]
          });
          this.isEditMode = true;
        }
      },
      error: (error) => {
        console.error('Error fetching batch data:', error);
      },
      complete: () => {
        this.isFetching = false;
      }
    });
  }
  saveBatch() {
    if (this.batchForm.invalid) {
      alert("Form is invalid. Please correct the errors.");
      return;
    }
    this.isLoading = true;
    const formValue = this.batchForm.value;
    console.log("FormData", formValue);
    delete formValue.batchId;
    this.batchService.createBatches(formValue).subscribe({
      next: (res: Batch[]) => {
        console.log("Batch saved successfully", res);
        alert("Batch screated successfully");
        this.batchForm.reset();
        this.isLoading = false;
        this.totalBatches.push(formValue);
      },
      error: (error: any) => {
        console.error("Error saving batch", error);
        this.isLoading = false;
      },
    });

  }

  updateBatch() {
    const formValue = this.batchForm.value;
    this.isUpdating = true;
    this.batchService.updateBatch(formValue.batchId, formValue).subscribe({
      next: (res: Batch[]) => {
        console.log("Batch updated successfully", res);
        alert("Batch updated successfully");
        const index = this.totalBatches.findIndex(batch => batch.batchId === formValue.batchId);
        if (index !== -1) {
          this.totalBatches[index] = { ...this.totalBatches[index], ...formValue };
        }
        this.batchForm.reset();
        this.isEditMode = false;
        this.isUpdating = false;
      },
      error: (error: any) => {
        console.error("Error updating batch", error);
        this.isUpdating = false;
      },
      complete: () => {
        console.log("REsponsive completed");
        this.isUpdating = false;
      },
    })
  }
  toggleEnrollmentForm(): void {
    if (!this.showEnrollmentForm) {
      this.getStudents();
    }
    this.showEnrollmentForm = !this.showEnrollmentForm;
  }

  getRecentEnrollments() {
    this.enrollmentService
      .loadEnrollments()
      .subscribe((data: IGetEnrollments[]) => {
        if (data) {
          this.totalEnrollment = data;
        }
      });
  }

  getStudents(): void {
    this.studentService.getAllStudent().subscribe({
      next: (data: Student[]) => {
        this.students = data; // Assign API response to students array
        console.log('Students data fetched successfully', data);
      },
      error: (error) => {
        console.error('Error fetching students:', error);
      },
      complete: () => {
        console.log('API call completed');
      }
    });
  }

  // CreateEnrollment
  createEnrollment(): void {
    const formValue = this.enrollmentForm.value;
    const batchId = this.batchId;
    delete formValue.enrollId;
    this.enrollmentService.createEnrollment(formValue, batchId).subscribe({
      next: (res: ICreateEnrollment[]) => {
        console.log(res, "Checking response");
        console.log("BATCH ID:", batchId);
      },
      error: (err: any) => {
        console.log(err, "Checking the error");
      },
      complete: () => {
        console.log("Execution Completed");
      }
    });
  }

}
