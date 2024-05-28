import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {InfluenciadoresComponent} from "./pages/influenciadores/influenciadores.component";
import {CalculadoraComponent} from "./pages/calculadora/calculadora.component";
import {FinancasComponent} from "./pages/financas/financas.component";
import {ServicosComponent} from "./pages/servicos/servicos.component";
import {
  CadastrarVisualizarServicoComponent
} from "./pages/cadastrar-visualizar-servico/cadastrar-visualizar-servico.component";


export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'influenciadores', component: InfluenciadoresComponent},
  { path: 'servicos', component: ServicosComponent},
  { path: 'cadastrar-visualizar-servico/:tipoPagina', component: CadastrarVisualizarServicoComponent},
  { path: 'financas', component: FinancasComponent},
  { path: 'calculadora', component: CalculadoraComponent},
  { path: '', redirectTo:"/login", pathMatch: 'full'}
];
