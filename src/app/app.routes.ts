import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {InfluenciadoresComponent} from "./pages/influenciadores/influenciadores.component";
import {CalculadoraComponent} from "./pages/calculadora/calculadora.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'influenciadores', component: InfluenciadoresComponent},
  { path: 'calculadora', component: CalculadoraComponent},
  { path: '', redirectTo:"/login", pathMatch: 'full'}
];
