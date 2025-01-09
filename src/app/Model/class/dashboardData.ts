export class Dashboarddata {
  result: boolean;
  message: string;
  dashboardData: {
    totalStudents: number;
    totalEnrollments: number;
    activeBatches: number;
    weeklyEnrollments: number;
    todaysFeesReceived: number;
    totalBatches: number;
    monthlyEnrollments: number;
    monthlyFeesReceived: number;
    todaysEnrollments: number;
    weeklyFeesReceived: number;
    totalFeesPending: number;
  };

  constructor() {
    this.result = true;
    this.message = '';
    this.dashboardData = {
      totalStudents: 0,
      totalEnrollments: 0,
      activeBatches: 0,
      weeklyEnrollments: 0,
      todaysFeesReceived: 0,
      totalBatches: 0,
      monthlyEnrollments: 0,
      monthlyFeesReceived: 0,
      todaysEnrollments: 0,
      weeklyFeesReceived: 0,
      totalFeesPending: 0,
    };
  }
}
