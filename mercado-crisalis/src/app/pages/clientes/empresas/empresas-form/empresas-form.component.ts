import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { __values } from 'tslib';
import { ClientesService } from 'src/app/services/clientes.service';
import { Empresa } from '../../empresa.model';



@Component({
  selector: 'app-empresas-form',
  templateUrl: './empresas-form.component.html',
  styleUrls: ['./empresas-form.component.scss']
})
export class EmpresasFormComponent {
  id: number;
  modoEdicion: boolean = false;
  empresa: Empresa;

  constructor(
    private clientesService: ClientesService,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Vemos si la ruta es de edición
    this.modoEdicion =
      this.route.snapshot.url.join().split(',')[2] === 'editar' ? true : false;

    if (this.modoEdicion) {
      //Obtenemos por url param el id del cliente
      this.route.queryParams.subscribe((params) => {
      let tempId = params['id'];

        if (tempId == null || tempId <= 0) {
          //Verificamos si el id es válido
          this.modoEdicion = false;
        } else {
          //Buscamos el cliente en sistema
          this.clientesService.findEmpresa(tempId).subscribe(
            (empresaResponse: any) => {
              console.log(empresaResponse);
              this.empresa = empresaResponse;
            },
            (error) => {
              //Si hay error cargamos empresa con los valores default
              console.log(error);
              this.modoEdicion = false;
              this.empresa = new Empresa(0, '', 0);
              this.snack.open(
                'No se encontró la empresa en el sistema !!',
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
      let undefinedEmpresa = new Empresa(0, '', 0);
      this.empresa = new Empresa(0, '', 0);
    }
  }

  formSubmit() {
    if (this.empresa.razonSocial == '' || this.empresa.razonSocial == null) {
      this.snack.open('La razón social de la empresa es requerida !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.empresa.cuit <= 0) {
      this.snack.open('El CUIT de la empresa debe ser válido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    if (this.modoEdicion) {
      this.clientesService.updateEmpresa(this.empresa).subscribe(
        (data) => {
          Swal.fire(
            'Empresa actualizada',
            'Empresa actualizada con éxito en el sistema',
            'success'
          ).then(() => {
            this.router.navigate(['clientes/empresas']);
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
      this.clientesService.saveEmpresa(this.empresa).subscribe(
        (data) => {
          console.log(data);
          Swal.fire(
            'Empresa guardada',
            'Empresa guardada con éxito en el sistema',
            'success'
          ).then(() => {
            this.router.navigate(['clientes/empresas']);
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
}