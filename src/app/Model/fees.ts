export interface IFeeDetail {
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
}

export interface IFeeDetailsResponse {
  result: boolean;
  feeDetails: IFeeDetail[];
}
