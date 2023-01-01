import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
