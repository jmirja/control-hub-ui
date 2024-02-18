import { NgModule, Optional, SkipSelf } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@core/interceptors/auth-interceptor';
import { ErrorInterceptor } from '@core/interceptors/error-interceptor';
import { throwIfAlreadyLoaded } from './utils/module-import-guard';
import { SharedModule } from '@shared/shared.module';
@NgModule({
  declarations: [],
  imports: [CoreRoutingModule, SharedModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
