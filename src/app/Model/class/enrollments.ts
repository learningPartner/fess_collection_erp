export class CreateEnrollment {
  enrollId: number;
  studid: number;
  batchId: number;
  totalFees: number;
  narration: string;
  enrollDate: string;
  discount: number;

  constructor() {
    this.enrollId = 0;
    this.studid = 0;
    this.batchId = 0;
    this.totalFees = 0;
    this.narration = '';
    this.enrollDate = '';
    this.discount = 0;
  }
}

export class GetEnrollments {
  enrollId: number;
  studid: number;
  batchId: number;
  enrollDate: string;
  narration: string;
  totalFees: number;
  name: string;
  batchName: string;

  constructor() {
    this.enrollId = 0;
    this.studid = 0;
    this.batchId = 0;
    this.enrollDate = '';
    this.narration = '';
    this.totalFees = 0;
    this.name = '';
    this.batchName = '';
  }
}
