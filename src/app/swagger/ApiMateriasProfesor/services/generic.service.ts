import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../conexiones/base-service';
import { CrudMaestroProfesor } from '../parametros/CrudMaestroProfesor';
import { StrictHttpResponse } from '../../conexiones/strict-http-response';
import { filter, map, Observable } from 'rxjs';
import { RequestBuilder } from '../../conexiones/request-builder';
import { ApiConfiguration } from '../../conexiones/api-configuration';
import { RespuestaApi } from '../models/RespuestaApi';

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
    static readonly ApiIUMaestroProfesor= '/MateriaProfesor/ObtenerMateriasProfesor';

    Get$Json$Response$GIU$Materia$Profesor(
        params?: {
           body?: CrudMaestroProfesor
        },
        context?: HttpContext       
    ): Observable<StrictHttpResponse<RespuestaApi>> {

        const rb = new RequestBuilder(this.rootUrl, GenericService.ApiIUMaestroProfesor, 'post');

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
                return r as StrictHttpResponse<RespuestaApi>;
            })
        );
    }

}
