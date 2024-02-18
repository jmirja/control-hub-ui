import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

    confirmationMessage: string = "Are you sure?";

    onConfirmEvent = new EventEmitter();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    ngOnInit(): void {
        this.confirmationMessage = this.data.Message;
    }

    ngOnDestroy(): void {
        this.confirmationMessage = null as any;
        this.data = null;
        this.onConfirmEvent = null as any;
    }

    confirm(val: boolean) {
        this.onConfirmEvent.emit(val);
    }

}
