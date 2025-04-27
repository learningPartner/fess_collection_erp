import { Component, inject } from '@angular/core';
import { EnrollmentService } from '../../services/enrollment.service';
import { IGetEnrollments } from '../../Model/interface/enrollments';
import { Constant } from '../../Constant/Constant';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BatchService } from '../../services/batch.service';
import { TableComponent } from '../../reusable/component/table/table.component';
import { ITableData } from '../../Model/interface/tableData';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-enrollments',
  imports: [ReactiveFormsModule, TableComponent, NgClass],
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss',
})
export class EnrollmentsComponent {
  enrollmentService = inject(EnrollmentService);
  batchService = inject(BatchService);

  totalEnrollment: IGetEnrollments[] = [];

  enrollFormInputs = Constant.enrollmentForm;
  batches: any[] = [];
  recentEnrollment: IGetEnrollments[] = [];
  activeTab: string = 'new-enrollment';

  enrollForm: FormGroup = new FormGroup({});

  initializeForm(data?: any) {
    this.enrollForm = new FormGroup({
      Name: new FormControl(data?.Name ?? '', [Validators.required]),
      Email: new FormControl(data?.Email ?? '', [Validators.required]),
      Phone: new FormControl(data?.Phone ?? '', [Validators.required]),
      Address: new FormControl(data?.Address ?? '', [Validators.required]),
      City: new FormControl(data?.City ?? '', [Validators.required]),
      PinCode: new FormControl(data?.PinCode ?? '', [Validators.required]),
      BatchId: new FormControl(data?.BatchId ?? '', [
        Validators.required,
        Validators.min(1),
      ]),
      TotalFees: new FormControl(data?.TotalFees ?? 0, [Validators.required]),
      Narration: new FormControl(data?.Narration ?? '', [Validators.required]),
      EnrollDate: new FormControl(data?.EnrollDate ?? '', [
        Validators.required,
      ]),
      Discount: new FormControl(data?.Discount ?? 0, [Validators.required]),
    });
  }

  columnData: ITableData[] = [
    {
      fieldname: 'enrollId',
      headername: 'Enroll ID',
    },
    {
      fieldname: 'name',
      headername: 'Student Name',
    },
    {
      fieldname: 'batchName',
      headername: 'Batch Name',
    },
    {
      fieldname: 'enrollDate',
      headername: 'Enroll Date',
      isDate: true,
    },
    {
      fieldname: 'totalFees',
      headername: 'Total Fees',
    },
    {
      fieldname: 'narration',
      headername: 'Narration',
    },
  ];

  constructor() {
    this.getEnrollments();
    this.getRecentEnrollments();
    this.initializeForm();
    this.loadBatches();
  }

  getEnrollments() {
    this.enrollmentService
      .loadEnrollments()
      .subscribe((data: IGetEnrollments[]) => {
        if (data) {
          this.totalEnrollment = data;
        }
      });
  }
  loadBatches() {
    this.batchService.loadBatches().subscribe((response: any) => {
      this.batches = response.map((batch: any) => batch.batchId);
    });
  }

  onSubmitEnrollment() {
    let payload = this.enrollForm.value;
    payload.EnrollDate = new Date(payload.EnrollDate).toISOString();
    payload.BatchId = this.batches;
    console.log('payload form:', payload);
    this.enrollmentService.createEnrollment(payload).subscribe((response) => {
      console.log('response:', response);
      this.getRecentEnrollments();
    });
  }

  getRecentEnrollments() {
    this.enrollmentService
      .loadEnrollments()
      .subscribe((data: IGetEnrollments[]) => {
        if (data) {
          const last5daysAgo = new Date();
          last5daysAgo.setDate(last5daysAgo.getDate() - 5);
          this.recentEnrollment = data.filter((enrollment) => {
            const enrollDate = new Date(enrollment.enrollDate);
            return enrollDate >= last5daysAgo;
          });
        }
      });
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }
}
