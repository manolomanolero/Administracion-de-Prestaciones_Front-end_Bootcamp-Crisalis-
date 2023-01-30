import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SingupComponent } from './pages/singup/singup.component';
import { LoginComponent } from './pages/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { PrestacionesComponent } from './pages/prestaciones/prestaciones.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { PrestacionesService } from './services/prestaciones.service';
import { PrestacionFormComponent } from './pages/prestaciones/prestacion-form/prestacion-form.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClienteFormComponent } from './pages/clientes/cliente-form/cliente-form.component';
import { ClientesService } from './services/clientes.service';
import { EmpresasComponent } from './pages/clientes/empresas/empresas.component';
import { EmpresasFormComponent } from './pages/clientes/empresas/empresas-form/empresas-form.component';
import { ImpuestosComponent } from './pages/impuestos/impuestos.component';
import { ImpuestosFormComponent } from './pages/impuestos/impuestos-form/impuestos-form.component';
import { ImpuestosService } from './services/impuestos.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { PedidosFormComponent } from './pages/pedidos/pedidos-form/pedidos-form.component';
import { PedidosService } from './services/pedidos.service';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { DetallesPedidoComponent } from './pages/pedidos/detalles-pedido/detalles-pedido.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SingupComponent,
    LoginComponent,
    HomeComponent,
    PrestacionesComponent,
    PrestacionFormComponent,
    ClientesComponent,
    ClienteFormComponent,
    EmpresasComponent,
    EmpresasFormComponent,
    ImpuestosComponent,
    ImpuestosFormComponent,
    PedidosComponent,
    PedidosFormComponent,
    DetallesPedidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [authInterceptorProviders, PrestacionesService, ClientesService, ImpuestosService, PedidosService,{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
