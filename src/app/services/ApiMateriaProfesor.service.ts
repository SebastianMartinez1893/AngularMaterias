import { Injectable } from '@angular/core';
import { GenericService } from '../swagger/ApiMateriasProfesor/services/generic.service';
import { CrudMaestroProfesor } from '../swagger/ApiMateriasProfesor/parametros/CrudMaestroProfesor';
import { RespuestaApi } from '../swagger/ApiMateriasProfesor/models/RespuestaApi';
import { environment } from '../../environments/environment';
import { StrictHttpResponse } from '../swagger/conexiones/strict-http-response';

@Injectable({
  providedIn: 'root'
})
export class ApiMateriaProfesorService {

  constructor( private genericServiceCloud: GenericService
  ) { }
  
  async IUMateriaProfesor(IUMateriaProfesor : CrudMaestroProfesor): Promise<RespuestaApi | undefined>{
      return new Promise<RespuestaApi | undefined>((resolve, reject) => {
          this.genericServiceCloud.rootUrl = environment.url;
          this.genericServiceCloud.Get$Json$Response$GIU$Materia$Profesor({ body: IUMateriaProfesor })
              .subscribe({
                  next: (success: StrictHttpResponse<RespuestaApi>) => {
                      resolve(success.body);  // Resuelve la promesa con el body de la respuesta
                  },
                  error: (e) => {

                      reject(e);
                  }
              });
      });
  }


    // // Retorna el resultado del registro de usuario
    // async RegistroUsuario(registroUsuario: RegistroUsuario): Promise<RespuestaUsuario | undefined> {
    //   return new Promise<RespuestaUsuario | undefined>((resolve, reject) => {
    //       this.genericServiceCloud.rootUrl = environment.url;
    //       this.genericServiceCloud.Post$Json$Response$Registro$Usuario({ body: registroUsuario })
    //           .subscribe({
    //               next: (success: StrictHttpResponse<RespuestaUsuario>) => {
    //                   resolve(success.body);  // Resuelve la promesa con el body de la respuesta
    //               },
    //               error: (e) => {

    //                   reject(e);
    //               }
    //           });
    //   });
    // }

}
