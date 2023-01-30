import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { DetallePedido } from 'src/app/models/detallePedido.model';
import { Impuesto } from 'src/app/models/impuesto.model';
import { Pedido } from 'src/app/models/pedido.model';
import { Prestacion } from 'src/app/models/prestacion.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { ImpuestosService } from 'src/app/services/impuestos.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PrestacionesService } from 'src/app/services/prestaciones.service';
import Swal from 'sweetalert2';
import { __values } from 'tslib';
import { MatTable } from '@angular/material/table';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.scss'],
})
export class PedidosFormComponent {
  id: number;
  modoEdicion: boolean = false;

  impuestos: Impuesto[];
  selectedImpuestos: Impuesto[];
  clientes: Cliente[];
  prestaciones: Prestacion[];

  prestacionSelected: Prestacion = new Prestacion(0, '', 0, 0, '');
  pedido: Pedido;
  clienteSelected: Cliente = new Cliente(0, 0, '', '', null);
  detallesPedidos: DetallePedido[] = [];
  detallePedidoActual: DetallePedido = new DetallePedido(
    null,
    1,
    new Prestacion(0, '', 0, 0, ''),
    0,
    false,
    [],
    0,
    0
  );
  clienteSeleccionadoId: number;
  costoNetoActual: number;

  displayedColumns: string[] = ['nombre', 'costo', 'tipo', 'edit/delete'];
  detallesDisplayedColumns: string[] = [
    'prestacion',
    'cantidad',
    'garantia',
    'costoProducto',
    'impuestos',
    'costoNeto',
    'delete',
  ];

  @ViewChild(MatTable) table: MatTable<DetallePedido>;
  @ViewChild('impuestosList', { static: true }) impuestosList: MatSelectionList;

  constructor(
    private impuestosService: ImpuestosService,
    private prestacionesService: PrestacionesService,
    private clientesService: ClientesService,
    private pedidoService: PedidosService,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prestacionesService.getPrestaciones().subscribe(
      (listadoPrestaciones: any) => {
        console.log(listadoPrestaciones);
        this.prestaciones = listadoPrestaciones;
      },
      (error) => {
        console.log(error);
        this.snack.open('Error al cargar prestaciones !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    );

    this.impuestosService.getImpuestos().subscribe(
      (listadoImpuestos: any) => {
        console.log(listadoImpuestos);
        this.impuestos = listadoImpuestos;
        console.log(this.impuestos);
      },
      (error) => {
        console.log(error);
        this.snack.open('Error al cargar impuestos !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    );

    this.clientesService.getClientes().subscribe(
      (listadoClientes: any) => {
        console.log(listadoClientes);
        this.clientes = listadoClientes;
      },
      (error) => {
        console.log(error);
        this.snack.open('Error al cargar clientes !!', 'Aceptar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    );

    //Vemos si la ruta es de edición
    this.modoEdicion =
      this.route.snapshot.url.join().split(',')[1] === 'editar' ? true : false;

    if (this.modoEdicion) {
      //Obtenemos por url param el id del pedido
      this.route.queryParams.subscribe((params) => {
        let tempId = params['id'];

        if (tempId == null || tempId <= 0) {
          //Verificamos si el id es válido
          this.modoEdicion = false;
        } else {
          //Buscamos el cliente en sistema
          this.pedidoService.findPedido(tempId).subscribe(
            (pedidoResponse: any) => {
              console.log(pedidoResponse);
              this.pedido = new Pedido(
                pedidoResponse.id,
                pedidoResponse.cliente,
                pedidoResponse.fecha,
                pedidoResponse.costoBruto,
                pedidoResponse.costoFinal,
                pedidoResponse.detallesPedidos
                );
              this.clienteSelected = pedidoResponse.cliente;
              this.detallesPedidos = pedidoResponse.detallesPedidos;
              this.table.renderRows();
            },
            (error) => {
              //Si hay error cargamos impuesto con los valores default
              console.log(error);
              this.modoEdicion = false;
              this.pedido = new Pedido(
                null,
                this.clienteSelected,
                new Date(),
                0,
                0,
                []
              );
              this.snack.open(
                'No se encontró el pedido en el sistema !!',
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
      this.pedido = new Pedido(null, this.clienteSelected, new Date(), 0, 0, []);
    }
  }

  calcularNetoDeDetalle() {
    this.detallePedidoActual.impuestos.length = 0;
    if (this.selectedImpuestos != null) {
      this.selectedImpuestos.forEach((elem) => {
        this.detallePedidoActual.impuestos.push(elem);
      });
    }

    this.detallePedidoActual.calcularCostoNeto();
  }

  calcularNetoActualDePedido(){
    this.costoNetoActual = 0;
    this.detallesPedidos.forEach((detalle) => {
        this.costoNetoActual += detalle.costoNeto;
    })
  }

  borrarDetalle(detallePedido: DetallePedido) {
    let index = this.detallesPedidos.indexOf(detallePedido);
    this.detallesPedidos.splice(index, 1);
    this.table.renderRows();
    this.calcularNetoActualDePedido();
  }

  formDetailsSubmit() {

    this.calcularNetoDeDetalle();

    this.detallesPedidos.push(this.detallePedidoActual);
    this.table.renderRows();
    this.detallePedidoActual = new DetallePedido(
      null,
      1,
      new Prestacion(0, '', 0, 0, ''),
      0,
      false,
      [],
      0,
      0
    );
    this.calcularNetoActualDePedido();
  }

  formSubmit() {
    /* TODO : Validaciones 

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
    }*/

    this.pedido.detallesPedidos = this.detallesPedidos;
    this.pedido.cliente = this.clienteSelected;

    this.pedido.calcularCostos();

    console.log("Pedido a guardar:");
    console.log(this.pedido);

    if (this.modoEdicion) {
      this.pedidoService.updatePedido(this.pedido).subscribe(
        (data) => {
          Swal.fire(
            'Pedido actualizado',
            'Pedido actualizado con éxito en el sistema',
            'success'
          ).then(() => {
            this.router.navigate(['pedidos']);
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
      this.pedidoService.savePedido(this.pedido).subscribe(
        (data) => {
          console.log(data);
          Swal.fire(
            'Pedido guardado',
            'Pedido guardado con éxito en el sistema',
            'success'
          ).then(() => {
            this.router.navigate(['pedidos']);
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
