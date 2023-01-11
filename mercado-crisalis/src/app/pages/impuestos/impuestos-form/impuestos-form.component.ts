import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ImpuestosService } from 'src/app/services/impuestos.service';
import Swal from 'sweetalert2';
import { __values } from 'tslib';
import { Impuesto } from '../impuesto.model';


@Component({
  selector: 'app-impuestos-form',
  templateUrl: './impuestos-form.component.html',
  styleUrls: ['./impuestos-form.component.scss']
})
export class ImpuestosFormComponent implements OnInit{
  id: number;
  modoEdicion: boolean = false;
  impuesto: Impuesto;

  constructor(
    private impuestosService: ImpuestosService,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Vemos si la ruta es de edición
    this.modoEdicion =
      this.route.snapshot.url.join().split(',')[2] === 'editar' ? true : false;

    if (this.modoEdicion) {
      //Obtenemos por url param el id del impuesto
      this.route.queryParams.subscribe((params) => {
      let tempId = params['id'];

        if (tempId == null || tempId <= 0) {
          //Verificamos si el id es válido
          this.modoEdicion = false;
        } else {
          //Buscamos el cliente en sistema
          this.impuestosService.findImpuesto(tempId).subscribe(
            (impuestoResponse: any) => {
              console.log(impuestoResponse);
              this.impuesto = impuestoResponse;
            },
            (error) => {
              //Si hay error cargamos impuesto con los valores default
              console.log(error);
              this.modoEdicion = false;
              this.impuesto = new Impuesto(0, "", 0);
              this.snack.open(
                'No se encontró el impuesto en el sistema !!',
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
      this.impuesto = new Impuesto(0, '', 0);
    }
  }

  formSubmit() {
    if (this.impuesto.nombre == '' || this.impuesto.nombre == null) {
      this.snack.open('El nombre del impuesto es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.impuesto.porcentaje <= 0) {
      this.snack.open('El porcentaje del im debe ser válido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    if (this.modoEdicion) {
      this.impuestosService.updateImpuesto(this.impuesto).subscribe(
        (data) => {
          Swal.fire(
            'Impuesto actualizado',
            'Impuesto actualizado con éxito en el sistema',
            'success'
          ).then(() => {
            this.router.navigate(['impuestos']);
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
      this.impuestosService.saveImpuesto(this.impuesto).subscribe(
        (data) => {
          console.log(data);
          Swal.fire(
            'Impuesto guardado',
            'Impuesto guardado con éxito en el sistema',
            'success'
          ).then(() => {
            this.router.navigate(['impuestos']);
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
