import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {InfluenciadoresComponent} from "./pages/influenciadores/influenciadores.component";
import {CalculadoraComponent} from "./pages/calculadora/calculadora.component";
import {FinancasComponent} from "./pages/financas/financas.component";
import {ServicosComponent} from "./pages/servicos/servicos.component";
import {
  CadastrarVisualizarServicoComponent
} from "./pages/cadastrar-visualizar-servico/cadastrar-visualizar-servico.component";
import {
  CadastrarVisualizarInfluenciadorComponent
} from "./pages/cadastrar-visualizar-influenciador/cadastrar-visualizar-influenciador.component";
import {PaginaNaoEncontradaComponent} from "./pages/pagina-nao-encontrada/pagina-nao-encontrada.component";
import {GastosComponent} from "./pages/gastos/gastos.component";
import {
  CadastrarVisualizarGastoComponent
} from "./pages/cadastrar-visualizar-gasto/cadastrar-visualizar-gasto.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'influenciadores', component: InfluenciadoresComponent},
  { path: 'cadastrar-visualizar-influenciador/:tipoPagina', component: CadastrarVisualizarInfluenciadorComponent},
  { path: 'servicos', component: ServicosComponent},
  { path: 'cadastrar-visualizar-servico/:tipoPagina', component: CadastrarVisualizarServicoComponent},
  { path: 'gastos', component: GastosComponent},
  { path: 'cadastrar-visualizar-gasto/:tipoPagina', component: CadastrarVisualizarGastoComponent},
  { path: 'financas', component: FinancasComponent},
  { path: 'calculadora', component: CalculadoraComponent},
  { path: '', redirectTo:"/login", pathMatch: 'full'},
  { path: '**', component: PaginaNaoEncontradaComponent}
];
