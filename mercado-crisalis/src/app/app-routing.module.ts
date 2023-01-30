import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteFormComponent } from './pages/clientes/cliente-form/cliente-form.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { EmpresasFormComponent } from './pages/clientes/empresas/empresas-form/empresas-form.component';
import { EmpresasComponent } from './pages/clientes/empresas/empresas.component';
import { HomeComponent } from './pages/home/home.component';
import { ImpuestosFormComponent } from './pages/impuestos/impuestos-form/impuestos-form.component';
import { ImpuestosComponent } from './pages/impuestos/impuestos.component';
import { LoginComponent } from './pages/login/login.component';
import { DetallesPedidoComponent } from './pages/pedidos/detalles-pedido/detalles-pedido.component';
import { PedidosFormComponent } from './pages/pedidos/pedidos-form/pedidos-form.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { PrestacionFormComponent } from './pages/prestaciones/prestacion-form/prestacion-form.component';
import { PrestacionesComponent } from './pages/prestaciones/prestaciones.component';
import { SingupComponent } from './pages/singup/singup.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SingupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'prestaciones',
    component: PrestacionesComponent,
    pathMatch: 'full',
  },
  {
    path: 'prestaciones/crear',
    component: PrestacionFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'prestaciones/editar',
    component: PrestacionFormComponent,
    pathMatch: 'prefix',
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    pathMatch: 'full',
  },
  {
    path: 'clientes/crear',
    component: ClienteFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'clientes/editar',
    component: ClienteFormComponent,
    pathMatch: 'prefix',
  },
  {
    path: 'clientes/empresas',
    component: EmpresasComponent,
    pathMatch: 'full',
  },
  {
    path: 'clientes/empresas/crear',
    component: EmpresasFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'clientes/empresas/editar',
    component: EmpresasFormComponent,
    pathMatch: 'prefix',
  },
  {
    path: 'impuestos',
    component: ImpuestosComponent,
    pathMatch: 'full',
  },
  {
    path: 'impuestos/crear',
    component: ImpuestosFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'impuestos/editar',
    component: ImpuestosFormComponent,
    pathMatch: 'prefix',
  },
  {
    path: 'pedidos',
    component: PedidosComponent,
    pathMatch: 'full',
  },
  {
    path: 'pedidos/crear',
    component: PedidosFormComponent,
    pathMatch: 'full',
  },
  {
    path: 'pedidos/editar',
    component: PedidosFormComponent,
    pathMatch: 'prefix',
  },
  {
    path: 'pedidos/detalles',
    component: DetallesPedidoComponent,
    pathMatch: 'prefix',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
