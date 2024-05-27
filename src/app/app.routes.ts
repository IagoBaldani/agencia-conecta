import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {InfluenciadoresComponent} from "./pages/influenciadores/influenciadores.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'influenciadores', component: InfluenciadoresComponent},
  { path: '', redirectTo:"/login", pathMatch: 'full'}
];
