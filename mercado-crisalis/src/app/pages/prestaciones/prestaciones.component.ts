import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { PrestacionesService } from 'src/app/services/prestaciones.service';
import { Prestacion } from './prestacion.model';

/*const ELEMENT_DATA: PeriodicElement[] = [
  { nombre: 'Hydrogen', costo: 1.0079, tipo: 'H' },
  { nombre: 'Helium', costo: 4.0026, tipo: 'He' },
  { nombre: 'Lithium', costo: 6.941, tipo: 'Li' },
  { nombre: 'Beryllium', costo: 9.0122, tipo: 'Be' },
  { nombre: 'Boron', costo: 10.811, tipo: 'B' },
];*/

@Component({
  selector: 'app-prestaciones',
  templateUrl: './prestaciones.component.html',
  styleUrls: ['./prestaciones.component.scss'],
})
export class PrestacionesComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'costo', 'tipo', 'edit/delete'];
  prestaciones: Prestacion[];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private snack: MatSnackBar,
    private prestacionesService: PrestacionesService
  ) {}

  ngOnInit(): void {
    this.prestacionesService
      .getPrestaciones()
      .subscribe((prestaciones: any) => {
        this.prestaciones = prestaciones;
      });
    console.log(this.prestaciones);
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
        this.prestacionesService.deletePrestaciones(id).subscribe({
          next: (data: any) => {
            console.log(data);
            Swal.fire(
              'Prestación eliminada',
              'Prestación eliminada con éxito en el sistema',
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
