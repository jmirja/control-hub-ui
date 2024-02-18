import { Component, ElementRef, ViewChild } from '@angular/core';
import { Bank } from '@core/models/data/bank';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { BankService } from '@core/services/bank.service';
import { MatDialog } from '@angular/material/dialog';
import { NewBankDialogComponent } from './dialogs/new-bank-dialog/new-bank-dialog.component';
import { EditBankDialogComponent } from './dialogs/edit-bank-dialog/edit-bank-dialog.component';
import { ConfirmationDialogComponent } from '@shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss'],
})
export class BanksComponent {
  searchBank: string;
  isSearching: boolean = false;
  searchInProgress: boolean = false;
  searchFound: boolean = false;

  bankList: Bank[] = [];
  tmpBankList: Bank[] = [];

  bankListDS = new MatTableDataSource();
  banksListColumn: { columnName: string; isShow: boolean }[] = [
    { columnName: 'id', isShow: true },
    { columnName: 'name', isShow: true },
    { columnName: 'action', isShow: true },
  ];

  banksLength: number = 0;
  banksOffset: number = 0;
  banksPageSize: number = 50;
  banksPageSizeOption: number[] = [this.banksPageSize, 100, 150];

  totalNoOfBanks: number = 0;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('bankListTable', { read: ElementRef })
  bankListTable: ElementRef;

  isBanksFailedToRetrieve: boolean = false;

  constructor(private bankService: BankService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.requestBanksList();
  }

  ngAfterViewInit(): void {
    this.bankListDS.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.searchBank = null;
    this.isSearching = null;
    this.searchInProgress = null;
    this.searchFound = null;
    this.bankList = null;
    this.tmpBankList = null;
    this.bankListDS = null;
    this.banksListColumn = null;
    this.banksLength = null;
    this.banksOffset = null;
    this.banksPageSize = null;
    this.banksPageSizeOption = null;
    this.totalNoOfBanks = null;
    this.sort = null;
    this.isBanksFailedToRetrieve = null;
    this.bankService = null;
    this.matDialog = null;
  }

  requestBanksList() {
    // this.bankService.getBanks().then((result: any) => {
    //   if (result != undefined && result != null) {
    //     let resultBankList = result;
    //     this.bankList = [];
    //     resultBankList.forEach(
    //       (element: { BankId: number; BankName: string }) => {
    //         let tmpBank = new Bank(element);
    //         this.bankList.push(tmpBank);
    //       }
    //     );
    //     resultBankList = null;
    //     this.banksLength = result.length;
    //     this.totalNoOfBanks = this.banksLength;
    //     this.isBanksFailedToRetrieve = false;
    //     this.refreshDataSource();
    //   }
    //   this.isBanksFailedToRetrieve = true;
    // });
  }

  refreshDataSource() {
    this.bankListDS.data = this.bankList;
    setTimeout(() => {
      if (this.bankListDS != null) {
        this.bankListDS.sort = this.sort;
      }
    }, 100);
    if (this.bankListTable != undefined)
      this.bankListTable.nativeElement.scrollTop = 0;
  }

  retryRequestBanksList() {
    this.isBanksFailedToRetrieve = false;
    this.ngOnInit();
  }

  loadBanksListPagination(event: any) {
    this.banksOffset = event.pageIndex * event.pageSize;
    this.banksPageSize = event.pageSize;
    if (
      this.searchBank.trim() == '' ||
      this.searchBank == null ||
      this.searchBank == undefined
    ) {
      this.requestBanksList();
    } else {
      this.onSearchBank();
    }
  }

  getDisplayColumns() {
    return this.banksListColumn
      .filter((c) => c.isShow)
      .map((c) => c.columnName);
  }

  onSearchBank() { }

  createNewBank() {
    const newBankDialogRef = this.matDialog.open(NewBankDialogComponent, {
      panelClass: 'custom-dialog',
    });
    const subscribeDialog =
      newBankDialogRef.componentInstance.newBankEvent.subscribe((data) => {
        if (data != undefined && data != null) {
          let newBankData = data;
          let newBank = new Bank({
            BankId: newBankData.BankId,
            BankName: newBankData.BankName,
          });
          this.bankList.unshift(newBank);
          if (this.bankList.length > this.banksPageSize) {
            this.bankList.pop();
          }
          this.totalNoOfBanks += 1;
          this.banksLength += 1;
          this.refreshDataSource();
          newBankDialogRef.close();
        }
      });

    newBankDialogRef.afterClosed().subscribe((result) => {
      subscribeDialog.unsubscribe();
    });
  }

  searchBoxKeyUp($event: any) { }

  clearSearch() { }

  onTblRowDblClick(bank: Bank) {
    this.viewBankDetails(bank);
  }

  viewBankDetails = (bank: Bank) => {
    const editBankDialogRef = this.matDialog.open(EditBankDialogComponent, {
      panelClass: 'custom-dialog',
      data: { Bank: bank },
    });
    const subscribeDialog =
      editBankDialogRef.componentInstance.editBankEvent.subscribe((data) => {
        if (data != undefined && data != null) {
          let updatedBankData = data;
          if (updatedBankData) {
            let bank = this.bankList.find((bank) => {
              return bank.BankId == updatedBankData.BankId;
            });
            if (updatedBankData != undefined) {
              bank.BankId = updatedBankData.BankId;
              bank.BankName = updatedBankData.BankName;
              this.refreshDataSource();
              editBankDialogRef.close();
            }
            bank = null;
          }
          updatedBankData = null;
        } else {
        }
      });
  };

  updateBankList(bankId: number): void {
    if (bankId) {
      const selectedIndex = this.bankList.findIndex(
        (obj) => obj.BankId == bankId
      );
      this.bankList.splice(selectedIndex, 1);
      this.refreshDataSource();
    }
  }

  deleteBank(bank: any) {
    // this.bankService.deleteBank(bank.BankId).then((result: any) => {
    //   if (result) {
    //     this.updateBankList(bank.BankId);
    //   }
    // });
  }

  onDeleteBank(bank: any) {
    const confirmationDialogRef = this.matDialog.open(
      ConfirmationDialogComponent,
      {
        panelClass: 'custom-dialog',
        data: {
          Message:
            'Are you sure do you want to remove ' + bank.BankName + '?',
        },
      }
    );

    const subConfirmationDialogRef =
      confirmationDialogRef.componentInstance.onConfirmEvent.subscribe(
        (result: boolean) => {
          if (result) {
            this.deleteBank(bank);
          }
          confirmationDialogRef.close();
        }
      );

    confirmationDialogRef.afterClosed().subscribe((result) => {
      subConfirmationDialogRef.unsubscribe();
    });
  }

}
