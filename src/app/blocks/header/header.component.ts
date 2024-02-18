import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { routes } from 'src/app/core/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public routers: typeof routes = routes;

  @Input()
  user: string = '';
  @Output() logoutEvent = new EventEmitter<any>();
  @Output() toggleEvent: EventEmitter<any> = new EventEmitter();

  constructor(private cDRef: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => cDRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void { }

  toggleSidebar() {
    this.toggleEvent.emit();
  }

  public logout(): void {
    this.logoutEvent.emit();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
