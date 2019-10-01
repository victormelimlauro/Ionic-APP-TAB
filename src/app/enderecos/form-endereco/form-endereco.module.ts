import { SharedModule } from './../../core/shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { FormEnderecoPage } from './form-endereco.page';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: FormEnderecoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormEnderecoPage]
})
export class FormEnderecoPageModule {}
