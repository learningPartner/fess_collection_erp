export class Batch {
  batchId: number;
  batchName: string;
  startDate: string;
  teacher: string;
  endDate: string;

  constructor() {
    this.batchId = 0;
    this.batchName = '';
    this.startDate = '';
    this.teacher = '';
    this.endDate = '';
  }
}
