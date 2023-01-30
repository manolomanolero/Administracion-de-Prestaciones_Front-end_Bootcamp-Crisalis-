import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit{

  public user = {
    username : '',
    email : '',
    password : ''
  }

  constructor(private userService:UserService, private snack:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
  }


  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido !!', 'Aceptar', {
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }
    if(this.user.email == '' || this.user.email == null){
      this.snack.open('El email de usuario es requerido !!', 'Aceptar', {
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }
    if(this.user.password == '' || this.user.password == null){
      this.snack.open('El password de usuario es requerido !!', 'Aceptar', {
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.userService.añadirUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success').then(() =>{
          this.router.navigate(['login']);
        });
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!', 'Aceptar', {
          duration : 3000,
          verticalPosition : 'top',
          horizontalPosition : 'right'
        });
      }
    );
  }

}
