import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { __values } from 'tslib';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from '../../../models/cliente.model';
import { Empresa } from '../../../models/empresa.model';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
})
export class ClienteFormComponent implements OnInit {
  id: number;
  cliente: Cliente;
  modoEdicion: boolean = false;
  empresaSelected: string = "0";
  empresas: Empresa[];

  constructor(
    private clientesService: ClientesService,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Vemos si la ruta es de edición
    this.modoEdicion =
      this.route.snapshot.url.join().split(',')[1] === 'editar' ? true : false;
    this.clientesService.getEmpresas().subscribe((empresas: any) => {
      console.log(empresas);
      this.empresas = empresas;
    });

    if (this.modoEdicion) {
      //Obtenemos por url param el id del cliente
      this.route.queryParams.subscribe((params) => {
        let tempId = params['id'];

        if (tempId == null || tempId <= 0) {
          //Verificamos si el id es válido
          this.modoEdicion = false;
        } else {
          //Buscamos el cliente en sistema
          this.clientesService.findCliente(tempId).subscribe(
            (clienteResponse: any) => {
              console.log(clienteResponse);
              this.cliente = clienteResponse;
              this.cliente.tipo = this.getTipo(clienteResponse);
              this.updateTipo();
              this.defaultEmpresaCliente();
            },
            (error) => {
              //Si hay error cargamos cliente con los valores default
              console.log(error);
              this.modoEdicion = false;
              let undefinedEmpresa = new Empresa(0, '', 0, new Date());
              this.cliente = new Cliente(0, 0, '', '', undefinedEmpresa);
              this.cliente.tipo = '';
              this.snack.open(
                'No se encontró el cliente en el sistema !!',
                'Aceptar',
                {
                  duration: 3000,
                  verticalPosition: 'top',
                  horizontalPosition: 'right',
                }
              );
            }
          );
        }
      });
    }

    if (!this.modoEdicion) {
      let undefinedEmpresa = new Empresa(0, '', 0, new Date());
      this.cliente = new Cliente(0, 0, '', '', undefinedEmpresa);
      this.cliente.tipo = '';
    }
  }

  formSubmit() {
    if (this.cliente.nombre == '' || this.cliente.nombre == null) {
      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.cliente.apellido == '' || this.cliente.apellido == null) {
      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (
      this.cliente.tipo !== 'Representante empresa' &&
      this.cliente.tipo !== 'Consumidor final'
    ) {
      this.snack.open('El tipo de cliente debe ser válido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.cliente.tipo === 'Representante empresa') {
      if (parseInt(this.empresaSelected) < 1) {
        this.snack.open('Debe asociarse a una empresa válida !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
        return;
      }
    }
    if (this.cliente.dni <= 0) {
      this.snack.open('El dni del cliente debe ser válido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    if (this.modoEdicion) {
      console.log("estamos actualizando");
      console.log(this.empresaSelected);
      this.cliente.empresa.id = parseInt(this.empresaSelected);
      console.log(this.cliente);

      this.clientesService.updateCliente(this.cliente).subscribe(
        (data) => {
          Swal.fire(
            'Cliente actualizado',
            'Cliente actualizado con éxito en el sistema',
            'success'
          ).then(() => {
            this.router.navigate(['clientes']);
          });
        },
        (error) => {
          console.log(error);
          this.snack.open('Ha ocurrido un error en el sistema !!', 'Aceptar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        }
      );
    } else {
      console.log("estamos guardando");
      if(this.cliente.empresa != null){
        this.cliente.empresa.id = parseInt(this.empresaSelected);
      } else {
        this.cliente.empresa
      }
      console.log(this.cliente);
      this.clientesService.saveCliente(this.cliente).subscribe(
        (data) => {
          console.log(data);
          Swal.fire(
            'Cliente guardado',
            'Cliente guardado con éxito en el sistema',
            'success'
          ).then(() => {
            this.router.navigate(['clientes']);
          });
        },
        (error) => {
          console.log(error);
          this.snack.open('Ha ocurrido un error en el sistema !!', 'Aceptar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        }
      );
    }
  }

  public updateTipo() {
    if (this.cliente.tipo === 'Representante empresa') {
      document.getElementById('listadoEmpresas').style.display = 'inline';
    } else {
      document.getElementById('listadoEmpresas').style.display = 'none';
    }
  }

  getTipo(cliente: Cliente) {
    if (cliente.empresa != null && cliente.empresa.id > 0) {
      return 'Representante empresa';
    } else {
      this.cliente.empresa = new Empresa(0,"",0, new Date());
      return 'Consumidor final';
    }
  }

  defaultEmpresaCliente(){
    let id = (this.cliente.empresa != null) ? this.cliente.empresa.id : 0;
    (<HTMLInputElement>document.getElementById('seleccionEmpresa')).value = "" + id;
  }
}
