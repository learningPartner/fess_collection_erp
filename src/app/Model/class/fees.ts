export class FeeDetail {
  enrollId: number;
  studid: number;
  batchId: number;
  enrollDate: string;
  narration: string;
  totalFees: number;
  name: string;
  batchName: string;
  paymentId: number;
  paymentDate: string;
  remarks: string;
  transactionReference: string;
  amount: number;
  paymentMode: string;

  constructor() {
    this.enrollId = 0;
    this.studid = 0;
    this.batchId = 0;
    this.enrollDate = '';
    this.narration = '';
    this.totalFees = 0;
    this.name = '';
    this.batchName = '';
    this.paymentId = 0;
    this.paymentDate = '';
    this.remarks = '';
    this.transactionReference = '';
    this.amount = 0;
    this.paymentMode = '';
  }
}

export class FeeDetailsResponse {
  result: boolean;
  feeDetails: FeeDetail[];

  constructor() {
    this.result = true;
    this.feeDetails = [];
  }
}

export class CreateFee {
  paymentId: number;
  enrollId: number;
  amount: number;
  paymentDate: string;
  paymentMode: string;
  transactionReference: string;
  remarks: string;
  fees: number;

  constructor() {
    this.paymentId = 0;
    this.enrollId = 0;
    this.amount = 0;
    this.paymentDate = '';
    this.paymentMode = '';
    this.transactionReference = '';
    this.remarks = '';
    this.fees = 0;
  }
}
