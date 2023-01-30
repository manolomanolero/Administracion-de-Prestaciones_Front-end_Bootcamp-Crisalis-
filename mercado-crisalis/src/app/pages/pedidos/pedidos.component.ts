import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pedido } from 'src/app/models/pedido.model';
import { PedidosService } from 'src/app/services/pedidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent {

    displayedColumns: string[] = ['cliente', 'fecha', 'costoBruto', 'costoFinal', 'details/edit/delete'];
    pedidos: Pedido[];
  
    constructor(
      private _liveAnnouncer: LiveAnnouncer,
      private snack: MatSnackBar,
      private pedidosService: PedidosService
    ) {}
  
    ngOnInit(): void {
      this.pedidosService
        .getPedidos()
        .subscribe((pedidos: any) => {
          this.pedidos = pedidos;
          console.log(this.pedidos);
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
          this.pedidosService.deletePedido(id).subscribe({
            next: (data: any) => {
              console.log(data);
              Swal.fire(
                'Pedido eliminado',
                'Pedido eliminado con éxito en el sistema',
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
  