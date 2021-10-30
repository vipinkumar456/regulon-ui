import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UsersComponent } from '../users/users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UserRolesComponent } from '../user-roles/user-roles.component';
import { FormsModule } from '@angular/forms';
import { AddUserComponent } from '../add-user/add-user.component';
import { AddUserRoleComponent } from '../add-user-role/add-user-role.component';
import { WorkFlowComponent } from '../work-flow/work-flow.component';
import { AddEditWorkflowComponent } from '../add-edit-workflow/add-edit-workflow.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserService } from '../../Services/user.service';
import { HttpModule } from '@angular/http';
import { WorkFlowService } from '../../Services/workflow.service';
import { DctsComponent } from '../dcts/dcts.component';
import { AddEditDctComponent } from '../add-edit-dct/add-edit-dct.component';
import { PagerService } from '../../Services/page.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';

@NgModule({
  declarations: [UsersComponent, UserRolesComponent, AddUserComponent, AddUserRoleComponent, WorkFlowComponent,
    AddEditWorkflowComponent,DctsComponent,AddEditDctComponent,AdminPanelComponent],
  imports: [
    FormsModule, ModalModule.forRoot(), HttpModule,TabsModule.forRoot(),
    CommonModule, AdminRoutingModule, MDBBootstrapModule.forRoot()
  ],
  entryComponents: [AddUserComponent, AddUserRoleComponent],
  providers: [UserService,WorkFlowService,PagerService]
})
export class AdminModule { }
