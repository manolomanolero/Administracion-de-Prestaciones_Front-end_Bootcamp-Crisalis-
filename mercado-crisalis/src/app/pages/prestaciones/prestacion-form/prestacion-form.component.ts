import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PrestacionesService } from 'src/app/services/prestaciones.service';
import Swal from 'sweetalert2';
import { __values } from 'tslib';
import { Prestacion } from '../../../models/prestacion.model';

@Component({
  selector: 'app-prestacion-form',
  templateUrl: './prestacion-form.component.html',
  styleUrls: ['./prestacion-form.component.scss'],
})
export class PrestacionFormComponent implements OnInit{
  id: number;
  prestacion: Prestacion;
  modoEdicion: boolean = false;

  constructor(
    private prestacionService: PrestacionesService,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Vemos si la ruta es de edición
    this.modoEdicion =
      this.route.snapshot.url.join().split(',')[1] === 'editar' ? true : false;

    if (this.modoEdicion) {
      //Obtenemos por url param el id de la prestación
      this.route.queryParams.subscribe((params) => {
        let tempId = params['id'];

        if (tempId == null || tempId <= 0) {
          //Verificamos si el id es válido
          this.modoEdicion = false;
        } else {
          //Buscamos la prestación en sistema
          this.prestacionService.findPrestaciones(tempId).subscribe(
            (prestacionResponse: any) => {
              console.log(prestacionResponse);
              this.prestacion = prestacionResponse;
            },
            (error) => {
              //Si hay error cargamos prestación con los valores default
              console.log(error);
              this.modoEdicion = false;
              this.prestacion = new Prestacion(0, '', -1, 0, '');
              this.snack.open(
                'No se encontró la prestación en el sistema !!',
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
      this.prestacion = new Prestacion(0, '', -1, 0, '');
    }
  }

  formSubmit() {
    if (this.prestacion.nombre == '' || this.prestacion.nombre == null) {
      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (
      this.prestacion.tipo !== 'producto' &&
      this.prestacion.tipo !== 'servicio'
    ) {
      this.snack.open('El tipo de prestación debe ser válido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
    if (this.prestacion.costo < 0) {
      this.snack.open(
        'El costo de la prestación no puede ser negativo !!',
        'Aceptar',
        {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        }
      );
      return;
    }

    if (this.modoEdicion) {
      this.prestacionService.updatePrestaciones(this.prestacion).subscribe(
        (data) => {
          Swal.fire(
            'Prestación actualizada',
            'Prestación actualizada con éxito en el sistema',
            'success'
          ).then(() =>{
            this.router.navigate(['prestaciones']);
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
      this.prestacionService.savePrestaciones(this.prestacion).subscribe(
        (data) => {
          console.log(data);
          Swal.fire(
            'Prestación guardada',
            'Prestación guardada con éxito en el sistema',
            'success'
          ).then(() =>{
            this.router.navigate(['prestaciones']);
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
