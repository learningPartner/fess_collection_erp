import { Component, input } from '@angular/core';
import { ITableData } from '../../../Model/interface/tableData';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  columnArray: ITableData[] = input([]);
}
