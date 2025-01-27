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
  todaysFeesReceived = 0;
  totalFeesPending = 0;

  constructor() {
    this.getDashboardData();
    this.getRecentEnrollments();
    this.getRecentFees();
  }

  getDashboardData() {
    this.dashboardService.loadDashboardData().subscribe((data: any) => {
      if (data) {
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
          const last20daysAgo = new Date();
          last20daysAgo.setDate(last20daysAgo.getDate() - 20);
          this.recentEnrollment = data.filter((enrollment) => {
            const enrollDate = new Date(enrollment.enrollDate);
            return enrollDate >= last20daysAgo;
          });
        }
      });
  }

  getRecentFees() {
    this.paymentService.loadFees().subscribe((data: any) => {
      if (data) {
        this.recentFees = data;
        this.updateCards();
      }
    });
  }

  formatAmount(amount: number): string {
    const sign = amount < 0 ? '-' : '';
    const absAmount = Math.abs(amount);

    if (absAmount >= 1_000_000) {
      return sign + (absAmount / 1_000_000).toFixed(1) + 'M';
    } else if (absAmount >= 1_000) {
      return sign + (absAmount / 1_000).toFixed(1) + 'K';
    } else {
      return sign + absAmount.toString();
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
          title: "Today's Fees Received",
          value: this.formatAmount(this.dashboardData.todaysFeesReceived),
          icon: 'bi bi-cash',
          iconClass:
            'icon icon-shape bg-success text-white text-lg rounded-circle',
        },
        {
          title: 'Total Fee Due',
          value: this.formatAmount(this.dashboardData.totalFeesPending),
          icon: 'bi bi-cash',
          iconClass:
            'icon icon-shape bg-danger text-white text-lg rounded-circle',
        },
        {
          title: 'Todays Enrollment',
          value: this.dashboardData.todaysEnrollments,
          icon: 'bi bi-people',
          iconClass:
            'icon icon-shape bg-primary text-white text-lg rounded-circle',
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
          title: 'Total Enrollments',
          value: this.dashboardData.totalEnrollments,
          icon: 'bi bi-people',
          iconClass:
            'icon icon-shape bg-primary text-white text-lg rounded-circle',
        },
      ];
    }
  }
}
