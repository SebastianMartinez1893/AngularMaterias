export interface RegistroUsuario{
    nombre? : null | string,
    apellido? : null | string,
    email? : null | string,
    celular?: null | string,
    passWord?: null | string,
    identificacion : number,
    rolId : number,
    idUsuario : number | null
}