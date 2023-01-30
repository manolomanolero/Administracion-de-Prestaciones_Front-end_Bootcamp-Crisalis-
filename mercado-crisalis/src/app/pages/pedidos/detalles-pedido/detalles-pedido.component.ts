import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { Pedido } from 'src/app/models/pedido.model';
import { PedidoCompleto } from 'src/app/models/pedidoCompleto.model';
import { PedidosService } from 'src/app/services/pedidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.scss']
})
export class DetallesPedidoComponent {

  pedido: PedidoCompleto;
  clientes: Cliente[] = [];

  displayedClienteColumns: string[] = ['nombre', 'apellido', 'dni', 'tipo', 'empresa'];
  detallesDisplayedColumns: string[] = [
    'prestacion',
    'cantidad',
    'garantia',
    'costoProducto',
    'impuestos',
    'costoNeto',
  ];

  constructor(
    private pedidoService: PedidosService,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
      //Obtenemos por url param el id del pedido
      this.route.queryParams.subscribe((params) => {
        let tempId = params['id'];

        if (tempId == null || tempId <= 0) {
          //Verificamos si el id es válido
          this.router.navigate(['pedidos']);
        } else {
          this.pedidoService.findPedidoCompleto(tempId).subscribe(
            (pedidoResponse: any) => {
              console.log(pedidoResponse);
              this.pedido = pedidoResponse;
              this.clientes.push(this.pedido.cliente);
            },
            (error) => {
              console.log(error);

              this.snack.open(
                'No se encontró el pedido en el sistema !!',
                'Aceptar',
                {
                  duration: 3000,
                  verticalPosition: 'top',
                  horizontalPosition: 'right',
                }
              );
              this.router.navigate(['pedidos']);
            }
          );
        }
      });

  }

}
