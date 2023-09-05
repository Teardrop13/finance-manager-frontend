import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { UpdateFinancialRecordRequest } from '@shared/models/financial-record.model';

@Component({
  selector: 'app-financial-record-edit-dialog',
  templateUrl: './financial-record-edit-dialog.component.html',
  styleUrls: ['./financial-record-edit-dialog.component.scss']
})
export class FinancialRecordEditDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public updateRequest: UpdateFinancialRecordRequest) {}
}
