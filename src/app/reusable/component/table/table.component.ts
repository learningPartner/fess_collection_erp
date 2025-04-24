import { Component, Input } from '@angular/core';
import { ITableData } from '../../../Model/interface/tableData';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() columnArray: ITableData[] = [];
  @Input() gridData: any[] = [];
}
