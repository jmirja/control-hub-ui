import { NgModule } from '@angular/core';

import { BlocksRoutingModule } from './blocks-routing.module';
import { AppComponent } from './root/app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '@shared/shared.module';
import { SidebarListComponent } from './sidebar-list/sidebar-list.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, SidebarListComponent],
  imports: [BlocksRoutingModule, SharedModule],
  exports: [AppComponent]
})
export class BlocksModule {
}
