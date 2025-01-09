export interface ICreateEnrollment {
  enrollId: number;
  studid: number;
  batchId: number;
  totalFees: number;
  narration: string;
  enrollDate: string;
  discount: number;
}

export interface IGetEnrollments {
  enrollId: number;
  studid: number;
  batchId: number;
  enrollDate: string;
  narration: string;
  totalFees: number;
  name: string;
  batchName: string;
}
