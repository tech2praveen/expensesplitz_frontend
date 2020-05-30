import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { ListServiceService } from '../list-service.service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { OrderModule } from 'ngx-order-pipe';
import {RouterModule,Routes} from '@angular/router';


import {NgSelectizeModule} from 'ng-selectize';

import { FilterPipe } from './filter.pipe';
import { ExpenseSplitComponent } from './expense-split/expense-split.component';



@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    OrderModule,
    NgbModalModule.forRoot(),
    HttpClientModule,
    NgSelectizeModule,
    RouterModule.forRoot([
      { path: 'expense', component: ExpenseSplitComponent , pathMatch: 'full'},
    ])
  ],
  declarations: [ExpenseSplitComponent,FilterPipe]
})

export class ExpenseModModule { }
