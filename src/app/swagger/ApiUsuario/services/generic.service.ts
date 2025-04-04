import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../conexiones/base-service';
import { RegistroUsuario } from '../parametros/RegistroUsuario';
import { StrictHttpResponse } from '../../conexiones/strict-http-response';
import { filter, map, Observable } from 'rxjs';
import { RequestBuilder } from '../../conexiones/request-builder';
import { ApiConfiguration } from '../../conexiones/api-configuration';
import { RespuestaUsuario } from '../models/RespuestaUsuario';

@Injectable({
  providedIn: 'root'
})
export class GenericService extends BaseService{

  constructor( config: ApiConfiguration,
    http: HttpClient
) {
    super(config, http);
}


    // Método para registrar el usuario
    static readonly ApiRegistroUsuario= '/Usuario/InsertarUsuario';
    Post$Json$Response$Registro$Usuario(
        params?: {
            body?: RegistroUsuario
        },
        context?: HttpContext       
    ): Observable<StrictHttpResponse<RespuestaUsuario>> {
//debugger;
        const rb = new RequestBuilder(this.rootUrl, GenericService.ApiRegistroUsuario, 'post');
        
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
                return r as StrictHttpResponse<RespuestaUsuario>;
            })
        );
    }
    

    
    // Métodos para obtener los datos del usuario
    static readonly ApiObtenerUsuario= '/Usuario/ValidarSesion';

    Get$Json$Response$Obtener$Usuario(
        params?: {
            email_str?: string,
            password_str?: string
        },
        context?: HttpContext       
    ): Observable<StrictHttpResponse<RespuestaUsuario>> {

        const rb = new RequestBuilder(this.rootUrl, GenericService.ApiObtenerUsuario, 'get');
       
        if (params) {
            rb.query('email', params.email_str);
            rb.query('password', params.password_str);
        }

        return this.http.request(rb.build({
            responseType: 'json',
            accept: 'text/json',
            context: context
        })).pipe(
            filter((r: any) => r instanceof HttpResponse),
            map((r: HttpResponse<any>) => {
                return r as StrictHttpResponse<RespuestaUsuario>;
            })
        );
    }

}
