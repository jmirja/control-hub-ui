import { Component, OnInit } from '@angular/core';
import { routes } from '@core/constants';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss'],
})
export class SidebarListComponent implements OnInit {
  public routers: typeof routes = routes;

  constructor() { }

  ngOnInit(): void { }
}
