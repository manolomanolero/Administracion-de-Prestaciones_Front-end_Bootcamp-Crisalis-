import { LiveAnnouncer } from '@angular/cdk/a11y';
  import { Component, OnInit } from '@angular/core';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import Swal from 'sweetalert2';
  import { ClientesService } from 'src/app/services/clientes.service';
import { Empresa } from '../../../models/empresa.model';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent {

    displayedColumns: string[] = ['razonSocial', 'cuit', 'inicioActividades', 'edit/delete'];
    empresas: Empresa[];
  
    constructor(
      private _liveAnnouncer: LiveAnnouncer,
      private snack: MatSnackBar,
      private clientesService: ClientesService
    ) {}
  
    ngOnInit(): void {
      this.clientesService
        .getEmpresas()
        .subscribe((empresas: any) => {
          this.empresas = empresas;
          console.log(this.empresas);
        });
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
          this.clientesService.deleteEmpresa(id).subscribe({
            next: (data: any) => {
              console.log(data);
              Swal.fire(
                'Empresa eliminada',
                'Empresa eliminada con éxito en el sistema',
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
  