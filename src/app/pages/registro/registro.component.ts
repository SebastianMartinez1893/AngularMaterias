import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistroUsuario } from '../../swagger/ApiUsuario/parametros/RegistroUsuario';
import { ApiUsuarioService } from '../../services/ApiUsuario.service';
import { RespuestaUsuario } from '../../swagger/ApiUsuario/models/RespuestaUsuario';
import { HttpStatusCode } from '@angular/common/http';
 import { ModalInformativoErrorComponent } from '../../componentes/modal-informativo-error/modal-informativo-error.component';
 import { ModalDeNotificacionComponent } from '../../componentes/modal-de-notificacion/modal-de-notificacion.component';
import { Roles } from '../../data/Roles';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  


  constructor(
    private modalService: NgbModal,
    private route: Router,
    private UsuarioService : ApiUsuarioService,
  ) { }

  ListRol: Roles[] = [
    {descripcion : 'Seleccione', Id : 0},
    {descripcion : 'Maestro', Id : 1},
    {descripcion : 'Estudiante', Id : 2}
  ];

  opciones_rol: any[] | null = [];
  opciones_roles: any[] | null = this.ListRol;


  // Variable de captura
  text_nombre: string = "";
  text_apellido: string = "";
  text_celular: string = "";
  text_email: string = "";
  text_password: string = "";
  text_Identificacion: string = "";
  rol_Id : number =0;

  async RegistroUsuarios(){
    let mensaje_personalizado : string = "";
     if (!this.text_nombre || !this.text_celular || !this.text_email || !this.text_password || this.rol_Id === 0) {
  
       mensaje_personalizado = `<div class="alineacion-texto"><span class="texto-title-msj">Para continuar con el registro tener en cuenta los siguientes campos:</span><br><br>` +
                               `<span class="texto-msj">* El nombre </span> </br>` +
                               `<span class="texto-msj">* El celular </span> </br>` +
                               `<span class="texto-msj">* El email </span> </br>` +
                               `<span class="texto-msj">* La contraseña </span> </br>` +
                               `<span class="texto-msj">* El Rol</span> </br>` +
                               `</div>`;
       const modalRefRegister = this.ModalConfirmation("html", mensaje_personalizado);
       modalRefRegister.componentInstance.confirmation.subscribe((result: boolean) => {
         modalRefRegister.close();
       });                        
     }
     else{
       
  
       let body : RegistroUsuario = {
         nombre : this.text_nombre,
         apellido : this.text_apellido.length > 0 ? this.text_apellido : "",
         email: this.text_email,
         celular: this.text_celular.toString(),
         passWord: this.text_password,
         identificacion : parseInt(this.text_Identificacion),
         rolId : this.rol_Id,
         idUsuario : 0
       }
  
       this.UsuarioService.RegistroUsuario(body)
       .then((respuestaApi: RespuestaUsuario | undefined) => {
         if (respuestaApi) {
          //console.log(respuestaApi);
           if (respuestaApi.codigoEstado == HttpStatusCode.Ok) {
            let datos = respuestaApi.valores
              //  Redireccionar al componente 'pages/home'
               this.route.navigate(['/Home']);
               sessionStorage.setItem("Email", this.text_email);
               sessionStorage.setItem("Password", this.text_password); 
               sessionStorage.setItem("Registro", "true"); 
               sessionStorage.setItem("NombreUsuario", this.text_nombre);
               sessionStorage.setItem("Id_Usuario",datos);
               sessionStorage.setItem("Rol", this.rol_Id.toString());

           }
           else
           {
             const modalRefRegister = this.ModalConfirmation("info", respuestaApi.mensaje);
  
             modalRefRegister.componentInstance.confirmation.subscribe((result: boolean) => {
               modalRefRegister.close();
             });
           }
  
         }
         else {
           this.VisualizacionModalInformativo();
         }
       })
       .catch((error: any) => {
         console.error("Error al registrar usuario:", error);
         this.VisualizacionModalInformativo();
       });
  
     }
   }
  
   
    // Método para invocar el modal informativo de mensajes
    ModalConfirmation(type: string, message?: string | null) {
      const modalRef = this.modalService.open(ModalDeNotificacionComponent, { 
        centered: true,
        backdrop: 'static',
        keyboard: false,
      });
  
      modalRef.componentInstance.type = type;
      modalRef.componentInstance.texto_confirmacion = message;
    
      return modalRef;
    }
  
    /** Metodo para invocar el modal informativo de errores */
    VisualizacionModalInformativo() {
      const activeModal = this.modalService.open(ModalInformativoErrorComponent, {
        size: 'lg',
        windowClass: "modal-informationerror",
        backdrop: 'static',
        keyboard: false,
      });
  
      activeModal.componentInstance.confirmation.subscribe((confirm: boolean) => {
        activeModal.close();
      });
    }
    
    ObtenerListadoEstadoGuia() {

}
}
