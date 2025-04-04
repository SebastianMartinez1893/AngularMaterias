import { Injectable } from '@angular/core';
import { GenericService } from '../swagger/ApiUsuario/services/generic.service';
import { RespuestaUsuario } from '../swagger/ApiUsuario/models/RespuestaUsuario';
import { RegistroUsuario } from '../swagger/ApiUsuario/parametros/RegistroUsuario';
import { environment } from '../../environments/environment';
import { StrictHttpResponse } from '../swagger/conexiones/strict-http-response';

@Injectable({
  providedIn: 'root'
})
export class ApiUsuarioService {

  constructor( private genericServiceCloud: GenericService
  ) { }
  
    // Retorna el resultado del registro de usuario
    async RegistroUsuario(registroUsuario: RegistroUsuario): Promise<RespuestaUsuario | undefined> {
      return new Promise<RespuestaUsuario | undefined>((resolve, reject) => {
          this.genericServiceCloud.rootUrl = environment.url;
          this.genericServiceCloud.Post$Json$Response$Registro$Usuario({ body: registroUsuario })
              .subscribe({
                  next: (success: StrictHttpResponse<RespuestaUsuario>) => {
                      resolve(success.body);  // Resuelve la promesa con el body de la respuesta
                  },
                  error: (e) => {

                      reject(e);
                  }
              });
      });
    }

    
    // Retorna los datos del usuario
    async ObtenerDatosUsuario(email_str?: string, password_str?: string): Promise<RespuestaUsuario | undefined> {
      return new Promise<RespuestaUsuario | undefined>((resolve, reject) => {
          this.genericServiceCloud.rootUrl = environment.url;
          this.genericServiceCloud.Get$Json$Response$Obtener$Usuario(
              { email_str: email_str, password_str : password_str }
          )
              .subscribe({
                  next: (success: StrictHttpResponse<RespuestaUsuario>) => {
                      resolve(success.body);  // Resuelve la promesa con el body de la respuesta
                  },
                  error: (e) => {

                      reject(e);
                  }
              });
      });
  }
}
