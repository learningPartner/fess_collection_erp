export interface IDashboarddata {
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
}
