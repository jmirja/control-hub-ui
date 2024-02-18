import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '@core/auth/auth-guard';

const routes: Routes = [

  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },

  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'banks', canActivate: [AuthGuard],
    loadChildren: () => import('@banks/banks.module').then((m) => m.BanksModule)
  },


  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
