import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingRoutingModule
  ]
})
export class UsersModule { }
