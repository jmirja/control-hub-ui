import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRequestBank } from 'src/app/core/models/request/IRequestBank';
import { BankService } from 'src/app/core/services/bank.service';

@Component({
  selector: 'app-new-bank-dialog',
  templateUrl: './new-bank-dialog.component.html',
  styleUrls: ['./new-bank-dialog.component.scss'],
})
export class NewBankDialogComponent implements OnInit {
  newBankForm: FormGroup;
  newBankEvent = new EventEmitter();

  addingBankInProgress: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bankService: BankService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.newBankForm = this.formBuilder.group({
      BankId: [0, Validators.required],
      BankName: ['', Validators.required],
    });
  }

  get controlsValues() {
    return this.newBankForm.controls;
  }

  ngOnDestroy(): void {
    this.newBankForm = null;
    this.newBankEvent = null;
    this.addingBankInProgress = null;
    this.data = null;
    this.bankService = null;
    this.formBuilder = null;
  }

  // onCreateBank() {
  //   try {
  //     this.addingBankInProgress = true;
  //     this.newBankForm.disable();

  //     let requestNewBank: IRequestBank = {
  //       BankId: 0,
  //       BankName: this.controlsValues.BankName.value,
  //     };

  //     this.bankService.registerBank(requestNewBank).then((result: any) => {
  //       if (result != undefined && result != null) {
  //         this.newBankEvent.emit(requestNewBank);
  //         this.addingBankInProgress = false;
  //         this.newBankForm.enable();
  //       }
  //     });
  //     this.newBankForm.enable();
  //     this.addingBankInProgress = false;
  //   } catch (error) {
  //     this.newBankForm.enable();
  //     this.addingBankInProgress = false;
  //   }
  // }

  onCreateBank() {
    
  }
}
