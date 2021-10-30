import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from '../../Services/auth.service';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
     AuthRoutingModule,SharedModule
  ],
  providers:[AuthService]
})
export class AuthModuleModule { }
