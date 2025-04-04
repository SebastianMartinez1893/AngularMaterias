export interface RespuestaUsuario{
    codigoEstado : number
    respuestaEstado : boolean,
    mensaje? : null | string,
    errores? : null | any,
    valores  : null | any,
}