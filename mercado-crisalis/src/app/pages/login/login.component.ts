import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user = {
    username: '',
    password: '',
  };

  constructor(private loginService: LoginService, private snack: MatSnackBar, private router: Router) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open(
        'El nombre de usuario o email es requerido !!',
        'Aceptar',
        {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        }
      );
      return;
    }
    if (this.user.password == '' || this.user.password == null) {
      this.snack.open('El password de usuario es requerido !!', 'Aceptar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    this.loginService.loginUser(this.user).subscribe(
      (data) => {
        console.log(data);
				this.loginService.saveTokenAndData(data);
				Swal.fire('Usuario logueado','Usuario logueado con exito en el sistema','success');
				this.router.navigate(['']);
        this.loginService.loginStatusSubjec.next(true);
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
