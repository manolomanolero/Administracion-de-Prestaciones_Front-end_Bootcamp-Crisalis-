import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Cliente } from './cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {

  displayedColumns: string[] = ['nombre', 'apellido', 'dni', 'tipo', 'empresa', 'edit/delete'];
  clientes: Cliente[];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private snack: MatSnackBar,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.clientesService
      .getClientes()
      .subscribe((clientes: any) => {
        this.clientes = clientes;
        console.log(this.clientes);
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
        this.clientesService.deleteCliente(id).subscribe({
          next: (data: any) => {
            console.log(data);
            Swal.fire(
              'Cliente eliminado',
              'Cliente eliminado con éxito en el sistema',
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
