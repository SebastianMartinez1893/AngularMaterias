import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent implements OnInit{

  constructor(private modalService : NgbModal,
    private route : Router
  ){}

//#region  Variables de asignación
isCollapsed = true;

CuentaConMasCentros : boolean = false;

// Se obtiene los datos del local storage de validación del token
usuario: any = {};

// Variable para obtener los datos inicales del centro de servicio seleccionado
centro_seleccionado : string = "";
centro_seleccionado_tamano : number = 0;


ngOnInit(): void {

  let nombre = sessionStorage.getItem("NombreUsuario"); 
  let rol = sessionStorage.getItem("Rol"); 
  
  this.usuario = {
    Username : nombre != null ? nombre : "",
    Rol : rol != null ? rol : "",
    NombreAplicacion: 'Eventos',
    UserID: nombre != null ? nombre : ""
  }

}


/**
 * Cerrar sesión del usuario.
 */
cerrarSesion() {
  sessionStorage.removeItem("NombreUsuario");
  sessionStorage.removeItem("Token");
  sessionStorage.removeItem("Id_Usuario");
  sessionStorage.removeItem("Rol");
  sessionStorage.removeItem("Email");
  sessionStorage.removeItem("Password");
  sessionStorage.removeItem("Registro");
  this.route.navigate(['/Login']);
}
}
