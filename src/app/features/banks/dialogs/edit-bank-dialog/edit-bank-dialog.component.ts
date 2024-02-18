import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { BankService } from 'src/app/core/services/bank.service';
import { IRequestBank } from 'src/app/core/models/request/IRequestBank';

@Component({
  selector: 'app-edit-bank-dialog',
  templateUrl: './edit-bank-dialog.component.html',
  styleUrls: ['./edit-bank-dialog.component.scss'],
})
export class EditBankDialogComponent implements OnInit {
  editBankForm: FormGroup;
  updatingBankInProgress: boolean = false;

  editBankEvent = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bankService: BankService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.onFormInit();
  }

  onFormInit(): void {
    this.editBankForm = this.formBuilder.group({
      BankId: [this.data.Bank.BankId, Validators.required],
      BankName: [this.data.Bank.BankName, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.editBankForm = null;
    this.editBankEvent = null;
    this.bankService = null;
    this.data = null;
  }

  get controlsValues() {
    return this.editBankForm.controls;
  }

  updateBank() {
    try {
      this.editBankForm.disable();
      this.updatingBankInProgress = true;
      let request: IRequestBank = {
        BankId: parseInt(this.controlsValues.BankId.value),
        BankName: this.controlsValues.BankName.value,
      };

      // this.bankService.updateBank(request).then((result: any) => {
      //   if (result != undefined && result != null) {
      //     this.editBankEvent.emit(request);
      //     this.editBankForm.enable();
      //     this.updatingBankInProgress = false;
      //   }
      // });

    } catch (error) {
      this.editBankForm.enable();
      this.updatingBankInProgress = false;
    }
  }

}
