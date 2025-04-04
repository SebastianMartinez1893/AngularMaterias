import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiUsuarioService } from '../../services/ApiUsuario.service';
import { ModalDeNotificacionComponent } from '../../componentes/modal-de-notificacion/modal-de-notificacion.component';
import { ModalInformativoErrorComponent } from '../../componentes/modal-informativo-error/modal-informativo-error.component';
import { RespuestaUsuario } from '../../swagger/ApiUsuario/models/RespuestaUsuario';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    
      constructor(private route : Router,
        private UsuarioService : ApiUsuarioService,
        private modalService : NgbModal,
        ){}
    
        
      //#region  Variables de consumo
      text_email : string = "";
      text_pass : string = "";

      
  //#region Métodos de consumo
  async IngresoUsuario(){
    // Selecciona el elemento del loader
    this.UsuarioService.ObtenerDatosUsuario(this.text_email, this.text_pass)
    .then((respuestaApi: RespuestaUsuario | undefined) => {
      if (respuestaApi) {
        if(respuestaApi.codigoEstado == HttpStatusCode.Ok){

          let datos : any =  respuestaApi.valores;
         // let rol : string =  datos.rol;          

          sessionStorage.setItem("Email", this.text_email);
          sessionStorage.setItem("Password", this.text_pass); 
          sessionStorage.setItem("Registro", "false"); 
          sessionStorage.setItem("NombreUsuario", datos.nombre);
          sessionStorage.setItem("Id_Usuario", datos.idUsuario);
          sessionStorage.setItem("Rol", datos.rolId);
          this.route.navigate(['/Home']);
        }
        else{
          const modalRefRegister = this.ModalConfirmation("info", respuestaApi.mensaje);
          modalRefRegister.componentInstance.confirmation.subscribe((result: boolean) => {
            modalRefRegister.close();
          });

        }            
      }
    })
    .catch((error) => {
      console.error("Error al obtener la información de la guía:", error);
    })

  }
  //#endregion 

  //#region Visualizacion de modales
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
  //#endregion
}
