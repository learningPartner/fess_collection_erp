import { Component, inject } from '@angular/core';
import { EnrollmentService } from '../../services/enrollment.service';
import { IGetEnrollments } from '../../Model/interface/enrollments';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-enrollments',
  imports: [DatePipe],
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss',
})
export class EnrollmentsComponent {
  enrollmentService = inject(EnrollmentService);

  totalEnrollment: IGetEnrollments[] = [];

  constructor() {
    this.getRecentEnrollments();
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
}
