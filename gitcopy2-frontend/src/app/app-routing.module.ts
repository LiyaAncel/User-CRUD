import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from  './login/login.component';
import { ListingComponent } from './listing/listing.component';
import { CreateuserComponent } from './createuser/createuser.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'user', component:ListingComponent},
  {path:'create',component:CreateuserComponent},
  {path: 'create/:id', component:CreateuserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
