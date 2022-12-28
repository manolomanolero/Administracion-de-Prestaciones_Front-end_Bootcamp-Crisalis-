import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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


  constructor(private _liveAnnouncer: LiveAnnouncer,
              private prestacionesService:PrestacionesService) {}

  ngOnInit(): void {
    this.prestacionesService.getPrestaciones()
        .subscribe(
          (prestaciones:any) =>{
            this.prestaciones = prestaciones;
          }
        );
        console.log(this.prestaciones);  }


}
