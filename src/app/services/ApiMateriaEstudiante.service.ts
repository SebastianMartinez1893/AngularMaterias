import { Injectable } from '@angular/core';
import { CrudMateriaEstudiante } from '../swagger/ApiMateriaEstudiante/parametros/CrudMateriaEstudiante';
import { ResponseApiestudiante } from '../swagger/ApiMateriaEstudiante/models/ResponseApiEstudiante';
import { environment } from '../../environments/environment';
import { StrictHttpResponse } from '../swagger/conexiones/strict-http-response';
import { GenericService } from '../swagger/ApiMateriaEstudiante/services/generic.service';
import { CrudMateriaEstudianteProfesor } from '../swagger/ApiMateriaEstudiante/parametros/CrudMateriaEstudianteProfesor';

@Injectable({
  providedIn: 'root'
})
export class ApiMateriaEstudianteService {

  constructor(private genericServiceCloud : GenericService) { }

    async GIUMateriaEstudiante(IUMateriaProfesor : CrudMateriaEstudiante): Promise<ResponseApiestudiante | undefined>{
        return new Promise<ResponseApiestudiante | undefined>((resolve, reject) => {
            this.genericServiceCloud.rootUrl = environment.url;
            this.genericServiceCloud.Get$Json$Response$GIU$Materia$Estudiante({ body: IUMateriaProfesor })
                .subscribe({
                    next: (success: StrictHttpResponse<ResponseApiestudiante>) => {
                        resolve(success.body);  // Resuelve la promesa con el body de la respuesta
                    },
                    error: (e) => {
  
                        reject(e);
                    }
                });
        });
    }

    async GIUMateriaEstudianteProfesor(IUMateriaEstudianteProfesor : CrudMateriaEstudianteProfesor): Promise<ResponseApiestudiante | undefined>{
        return new Promise<ResponseApiestudiante | undefined>((resolve, reject) => {
            this.genericServiceCloud.rootUrl = environment.url;
            this.genericServiceCloud.Get$Json$Response$GIU$Materia$Estudiante$Profesor({ body: IUMateriaEstudianteProfesor })
                .subscribe({
                    next: (success: StrictHttpResponse<ResponseApiestudiante>) => {
                        resolve(success.body);  // Resuelve la promesa con el body de la respuesta
                    },
                    error: (e) => {
  
                        reject(e);
                    }
                });
        });
    }
}
