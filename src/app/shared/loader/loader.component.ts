import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

    @Input() totalNoOfItems = 0;
    @Input() isFailedToRetrieve = false;
    @Output() retryRequestEvent: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit(): void { }

    retryRequest() {
        this.retryRequestEvent.emit(true);
    }

    ngOnDestroy(): void { }

}
