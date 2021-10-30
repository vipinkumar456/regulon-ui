import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from '../users/users.component';
import { UserRolesComponent } from '../user-roles/user-roles.component';
import { WorkFlowComponent } from '../work-flow/work-flow.component';
import { AddEditWorkflowComponent } from '../add-edit-workflow/add-edit-workflow.component';
import { DctsComponent } from '../dcts/dcts.component';
import { AddEditDctComponent } from '../add-edit-dct/add-edit-dct.component';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
const routes: Routes = [
    {

        path: '',
        redirectTo: 'login'
    },
    {
        path: 'users',
        component: UsersComponent,
        data: {
            title: 'Users'
        }

    },
    // {
    //     path: 'userroles',
    //     component: UserRolesComponent,
    //     data: {
    //         title: 'User Roles'
    //     }

    // },
    {
        path: 'workflow',
        component: WorkFlowComponent,
        data: {
            title: 'Work Flow'
        }

    },
    {
        path: 'workflow/add',
        component: AddEditWorkflowComponent,
        data: {
            title: 'Work Flow'
        }

    },
    {
        path: 'workflow/edit/:id',
        component: AddEditWorkflowComponent,
        data: {
            title: 'Work Flow'
        }

    },
    {
        path: 'dcts',
        component: DctsComponent,
        data: {
            title: "DCT's"
        }

    },
    {
        path: 'dct/add',
        component: AddEditDctComponent,
        data: {
            title: "DCT Add"
        }

    },
    {
        path: 'dct/edit/:id',
        component: AddEditDctComponent,
        data: {
            title: "DCT Edit"
        }

    },
    {
        path: 'dashboard',
        component: AdminPanelComponent,
        data: {
            title: "Dashboard"
        }

    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
