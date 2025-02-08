import { Component, inject } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import {
  IBatchWithFee,
  IFeeDetailWithPaymentMode,
  IStudentWithBatch,
} from '../../../Model/interface/Student';
import { TabsModule } from 'primeng/tabs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-details',
  imports: [TabsModule, RouterModule, TableModule, DatePipe, CurrencyPipe],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss',
})
export class StudentDetailsComponent {
  studentService = inject(StudentService);
  studentData: IBatchWithFee[] = [];
  studentFeeDetails: any[] = [];
  route = inject(ActivatedRoute);

  constructor() {
    this.loadStudentsDetails();
  }

  activeTab: string = 'batch';

  tabs: { title: string; value: string }[] = [];

  ngOnInit() {
    this.tabs = [
      { title: 'Batch List', value: 'batch' },
      { title: 'Payment', value: 'payment' },
    ];
  }

  loadStudentsDetails() {
    const studentId = this.route.snapshot.paramMap.get('studentId');

    if (studentId) {
      this.studentService.getStudentBatchesWithFees(studentId).subscribe(
        (student: any) => {
          if (student && Array.isArray(student.batches)) {
            this.studentData = student.batches;
            this.studentFeeDetails = student.batches.flatMap(
              (batch) => batch.feeDetails || []
            );
          } else {
            this.studentData = [];
          }
        },
        (error) => {
          console.error('API error:', error);
        }
      );
    } else {
      console.error('Invalid studentId:', studentId);
    }
  }
}
