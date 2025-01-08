import { Component, inject } from '@angular/core';
import { IDashboarddata, IEnrollments } from '../../Model/dashboardData';
import { EnrollmentService } from '../../services/enrollment.service';
import { DashboardService } from '../../services/dashboard.service';
import { IFeeDetailsResponse } from '../../Model/fees';
import { PaymentService } from '../../services/payment.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  enrollmentService = inject(EnrollmentService);
  dashboardService = inject(DashboardService);
  paymentService = inject(PaymentService);

  dashboardData: IDashboarddata['dashboardData'] | null = null;
  recentEnrollment: IEnrollments[] = [];
  recentFees: IFeeDetailsResponse | null = null;
  cards: any[] = [];
  totalFeesReceived = 0;
  formatedAmount = '';

  sidebarVisible: boolean = true;

  /* menuItems = [
    {
      icon: 'bi-house',
      iconClass: 'icon mr-2',
      label: 'Dashboard',
      routerLink: '/dashboard',
    },
    {
      icon: 'bi-people',
      iconClass: 'icon mr-2',
      label: 'Student',
      routerLink: '/dashboard',
    },
    {
      icon: 'bi-book',
      iconClass: 'icon mr-2',
      label: 'Batch',
      routerLink: '/dashboard',
    },
    {
      icon: 'bi bi-person',
      iconClass: 'icon mr-2',
      label: 'Teacher',
      routerLink: '/dashboard',
    },
  ]; */

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
      .subscribe((data: IEnrollments[]) => {
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
      ];
    }
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
