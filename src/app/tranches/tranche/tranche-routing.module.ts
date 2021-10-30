import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubmittedSummaryComponent } from '../../submitted-summary/submitted-summary.component';

import { Tranche1Component } from '../tranche1/tranche1.component';
import { Tranche2Component } from '../tranche2/tranche2.component';
import { Tranche3Component } from '../tranche3/tranche3.component';
const routes: Routes = [
    {

        path: '',
        redirectTo: 'tranche1/1'
    },
    {
        path: 'tranche1',
        component: Tranche1Component,
        data: {
            title: 'Tranche 1'
        }

    }, {
        path: 'tranche1/:id',
        component: Tranche1Component,
        data: {
            title: 'Tranche 1'
        }

    }, {
        path: 'tranche2/:id',
        component: Tranche2Component,
        data: {
            title: 'Tranche 2'
        }

    },
    {
      path: 'tranche3/:id',
      component: Tranche3Component,
      data: {
          title: 'Tranche 3'
      }

  },

    {
        path: 'submitted/:id',
        component: SubmittedSummaryComponent,
        data: {
            title: 'Submitted Summary'
        }

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrancheRoutingModule { }
