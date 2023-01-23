import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImpuestosService } from 'src/app/services/impuestos.service';
import Swal from 'sweetalert2';
import { Impuesto } from '../../models/impuesto.model';

@Component({
  selector: 'app-impuestos',
  templateUrl: './impuestos.component.html',
  styleUrls: ['./impuestos.component.scss']
})
export class ImpuestosComponent implements OnInit{

    displayedColumns: string[] = ['nombre', 'porcentaje', 'edit/delete'];
    impuestos: Impuesto[];

    constructor(
      private _liveAnnouncer: LiveAnnouncer,
      private snack: MatSnackBar,
      private impuestosService: ImpuestosService
    ) {}

    ngOnInit(): void {
      this.impuestosService
            .getImpuestos()
            .subscribe((impuestos:any) => {
              this.impuestos = impuestos;
              console.log(impuestos);
            })
    }

    onDelete(id: number) {
      Swal.fire({
        title: 'Estás seguro?',
        text: 'No podrás revertir el borrado!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, bórralo!',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('eliminando id ' + id);
          this.impuestosService.deleteImpuesto(id).subscribe({
            next: (data: any) => {
              console.log(data);
              Swal.fire(
                'Impuesto eliminado',
                'Impuesto eliminado con éxito en el sistema',
                'success'
              ).then(() => window.location.reload());
            },
            error: (error) => {
              console.log(error);
              this.snack.open(
                'Ha ocurrido un error en el sistema !!',
                'Aceptar',
                {
                  duration: 3000,
                  verticalPosition: 'top',
                  horizontalPosition: 'right',
                }
              );
            },
          });
        }
      });
    }
  }
