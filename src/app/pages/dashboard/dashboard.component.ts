import { Component, inject } from '@angular/core';
import { EnrollmentService } from '../../services/enrollment.service';
import { DashboardService } from '../../services/dashboard.service';
import { PaymentService } from '../../services/payment.service';
import { DatePipe } from '@angular/common';
import { IDashboarddata } from '../../Model/interface/dashboardData';
import { IFeeDetailsResponse } from '../../Model/interface/fees';
import { IGetEnrollments } from '../../Model/interface/enrollments';
import { CardComponent } from '../../reusable/component/card/card.component';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  enrollmentService = inject(EnrollmentService);
  dashboardService = inject(DashboardService);
  paymentService = inject(PaymentService);

  dashboardData: IDashboarddata['dashboardData'] | null = null;
  recentEnrollment: IGetEnrollments[] = [];
  recentFees: IFeeDetailsResponse | null = null;
  cards: any[] = [];
  totalFeesReceived = 0;
  formatedAmount = '';

  constructor() {
    this.getDashboardData();
    this.getRecentEnrollments();
    this.getRecentFees();
  }

  getDashboardData() {
    this.dashboardService.loadDashboardData().subscribe((data: any) => {
      if (data && data.result) {
        this.dashboardData = data.dashboardData;
        this.updateCards();
      }
    });
  }

  getRecentEnrollments() {
    this.enrollmentService
      .loadEnrollments()
      .subscribe((data: IGetEnrollments[]) => {
        if (data) {
          this.recentEnrollment = data;
        }
      });
  }

  getRecentFees() {
    this.paymentService.loadFees().subscribe((data: any) => {
      if (data && data.result) {
        this.recentFees = data;
        this.totalFeesReceived = data.feeDetails.reduce(
          (sum: number, feeDetail: any) => {
            return sum + feeDetail.amount;
          },
          0
        );
        this.formatedAmount = this.formatAmount(this.totalFeesReceived);
        this.updateCards();
      }
    });
  }

  formatAmount(amount: number): string {
    if (amount >= 1_000_000) {
      return (amount / 1_000_000).toFixed(1) + 'M';
    } else if (amount >= 1_000) {
      return (amount / 1_000).toFixed(1) + 'K';
    } else {
      return amount.toString();
    }
  }

  updateCards() {
    if (this.dashboardData) {
      this.cards = [
        {
          title: 'Student Count',
          value: this.dashboardData.totalStudents,
          icon: 'bi-mortarboard-fill',
          iconClass:
            'icon icon-shape bg-tertiary text-white text-lg rounded-circle',
        },
        {
          title: 'Total Batches',
          value: this.dashboardData.activeBatches,
          icon: 'bi bi-book',
          iconClass:
            'icon icon-shape bg-info text-white text-lg rounded-circle',
        },
        {
          title: 'Total Enrollments',
          value: this.dashboardData.totalEnrollments,
          icon: 'bi bi-people',
          iconClass:
            'icon icon-shape bg-primary text-white text-lg rounded-circle',
        },
        {
          title: 'Fees Received',
          value: this.formatedAmount,
          icon: 'bi bi-cash',
          iconClass:
            'icon icon-shape bg-success text-white text-lg rounded-circle',
        },
        {
          title: 'Weekly Enrollment',
          value: this.dashboardData.weeklyEnrollments,
          icon: 'bi bi-people',
          iconClass:
            'icon icon-shape bg-primary text-white text-lg rounded-circle',
        },
        {
          title: 'Monthly Enrollment',
          value: this.dashboardData.monthlyEnrollments,
          icon: 'bi bi-people',
          iconClass:
            'icon icon-shape bg-primary text-white text-lg rounded-circle',
        },
        {
          title: 'Todays Enrollment',
          value: this.dashboardData.todaysEnrollments,
          icon: 'bi bi-people',
          iconClass:
            'icon icon-shape bg-primary text-white text-lg rounded-circle',
        },
      ];
    }
  }
}
