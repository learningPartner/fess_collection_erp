export interface Student {
  studid: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pinCode: string;
}

export interface IStudentWithBatch {
  studentId: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pinCode: string;
  batches: IBatchWithFee[];
}

export interface IBatchWithFee {
  enrollId: number;
  enrollDate: string;
  narration: string;
  totalFees: number;
  batchId: number;
  batchName: string;
  startDate: string;
  endDate: string;
  teacher: string;
  feeDetails: IFeeDetailWithPaymentMode[];
}

export interface IFeeDetailWithPaymentMode {
  paymentId: number;
  paymentDate: string;
  amount: number;
  paymentMode: string;
  transactionReference: string;
  remarks: string;
}
