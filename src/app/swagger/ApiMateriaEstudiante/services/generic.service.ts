import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../conexiones/base-service';
import { CrudMateriaEstudiante } from '../parametros/CrudMateriaEstudiante';
import { StrictHttpResponse } from '../../conexiones/strict-http-response';
import { filter, map, Observable } from 'rxjs';
import { RequestBuilder } from '../../conexiones/request-builder';
import { ApiConfiguration } from '../../conexiones/api-configuration';
import { ResponseApiestudiante } from '../models/ResponseApiEstudiante';
import { CrudMateriaEstudianteProfesor } from '../parametros/CrudMateriaEstudianteProfesor';

@Injectable({
  providedIn: 'root'
})
export class GenericService extends BaseService{

  constructor( config: ApiConfiguration,
    http: HttpClient
) {
    super(config, http);
}

    // Método para obtener, insertar y actualizar las materias del profesor
    static readonly ApiGIUMateriaEstudiante= '/MateriaEstudiante/EstudiantePorMateria';

    Get$Json$Response$GIU$Materia$Estudiante(
        params?: {
           body?: CrudMateriaEstudiante
        },
        context?: HttpContext       
    ): Observable<StrictHttpResponse<ResponseApiestudiante>> {

        const rb = new RequestBuilder(this.rootUrl, GenericService.ApiGIUMateriaEstudiante, 'post');

        if (params) {
            rb.query('IdMateria', params.body?.idMateria);
            rb.query('IdUsuarioProfesor', params.body?.idProfesor);
        }
        return this.http.request(rb.build({
            responseType: 'json',
            accept: 'text/json',
            context: context
        })).pipe(
            filter((r: any) => r instanceof HttpResponse),
            map((r: HttpResponse<any>) => {
                return r as StrictHttpResponse<ResponseApiestudiante>;
            })
        );
    }

    // Método para obtener, insertar y actualizar las materias del profesor
    static readonly ApiGIUMateriaEstudianteProfesor= '/MateriaEstudiante/EstudianteMateriaProfesor';
    Get$Json$Response$GIU$Materia$Estudiante$Profesor(
        params?: {
           body?: CrudMateriaEstudianteProfesor
        },
        context?: HttpContext       
    ): Observable<StrictHttpResponse<ResponseApiestudiante>> {

        const rb = new RequestBuilder(this.rootUrl, GenericService.ApiGIUMateriaEstudianteProfesor, 'post');

        if (params) {
            rb.body(params.body, 'application/*+json');
        }
        return this.http.request(rb.build({
            responseType: 'json',
            accept: 'text/json',
            context: context
        })).pipe(
            filter((r: any) => r instanceof HttpResponse),
            map((r: HttpResponse<any>) => {
                return r as StrictHttpResponse<ResponseApiestudiante>;
            })
        );
    }

}
