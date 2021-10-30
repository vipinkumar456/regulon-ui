import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './auth/login/login.component';
import { P500Component } from './error/500.component';
import { P404Component } from './error/404.component';
import { RegisterComponent } from './auth/register/register.component';
import { Profile1Component } from './auth/profile/profile1.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

import { AuthGuard } from './guards/auth-guard.service';
import { HistoryComponent } from './history/history.component';
import { OverviewComponent } from './overview/overview.component';
import { DownloadComponent } from './download/download.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FaqComponent } from './faq/faq.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/module/auth-module.module').then(m => m.AuthModuleModule)
  },
  {
    path:'logout',
    component:LogoutComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: DashboardComponent
      },
      {
        path: 'tranches',
        loadChildren: () => import('./tranches/tranche/tranche.module').then(m => m.TrancheModule)
      },
      {
        path: 'history',
        component:HistoryComponent
        // loadChildren: () => import('./tranches/tranche/tranche.module').then(m => m.TrancheModule)
      },
      {
        path: 'download',
        component:DownloadComponent
        // loadChildren: () => import('./tranches/tranche/tranche.module').then(m => m.TrancheModule)
      },
      {
        path: 'overview',
        component:OverviewComponent
        // loadChildren: () => import('./tranches/tranche/tranche.module').then(m => m.TrancheModule)
      },
      {
        path: 'guidelines',
        component:GuidelinesComponent
        // loadChildren: () => import('./tranches/tranche/tranche.module').then(m => m.TrancheModule)
      },
      {
        path: 'faq',
        component:FaqComponent
        // loadChildren: () => import('./tranches/tranche/tranche.module').then(m => m.TrancheModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./Admin/admin-module/admin.module').then(m => m.AdminModule)
      },
      {path:'comingSoon',component:ComingSoonComponent}
    ]

  },
  { path: '**', redirectTo:'comingSoon' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
