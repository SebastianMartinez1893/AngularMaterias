import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lista_IndicePaginador } from '../../../environments/environment';
import { HttpStatusCode } from '@angular/common/http';
import { ApiMateriaEstudianteService } from '../../services/ApiMateriaEstudiante.service';
import { CrudMateriaEstudiante } from '../../swagger/ApiMateriaEstudiante/parametros/CrudMateriaEstudiante';
import { ResponseApiestudiante } from '../../swagger/ApiMateriaEstudiante/models/ResponseApiEstudiante';
import { TableDinamicoModalService } from '../table-dinamico-modal/table-dinamico-modal.service';

@Component({
  selector: 'app-modal-materia-estudiantes',
  templateUrl: './modal-materia-estudiantes.component.html',
  styleUrl: './modal-materia-estudiantes.component.css'
})
export class ModalMateriaEstudiantesComponent  implements OnInit{

constructor(
  private tablaDinamicMateriaEstudiantes : TableDinamicoModalService,
  private apiServiceMateriaEstudiante : ApiMateriaEstudianteService

){}
  // Emisores de eventos para confirmación modal y confirmación general
  @Output() confirmation = new EventEmitter<{ confirmacion: boolean }>();
  
  _datosdetalle: any = {};
  IdMateria : number = 0;

  // Propiedades para la paginación y filtros
  totalRegistro?: null | number = 0;
  itemsPerPage: number = 0;
  currentPage: number = 1;
  tableSizes: any = lista_IndicePaginador;
  
  // Variable con el contenido original
  listadetalleTmp: any = {};
  
  // Variables para la visualización de datos en la tabla dinámica
  datos_dinamicos_table_materia_estudiantes : any = {aplica_check : false, header : [], body : []};

  onConfirm(confirm: boolean) {
   
    this.confirmation.emit({ confirmacion: confirm });
  }

  ngOnInit(): void {
     let Id = sessionStorage.getItem("Id_Usuario");
     let IdUsuario: number = Id !== null ? Number(Id) : 0;
     this.IdMateria = this._datosdetalle.idMateria;
     console.log("IdMateria");
     console.log(this.IdMateria)
     console.log("IdUsuario");
     console.log(IdUsuario);
    let crud : CrudMateriaEstudiante = {
      idMateria : this.IdMateria,
      idProfesor : IdUsuario
    }
    this.ListadoMaterias(crud)
  }  
    ListadoMaterias(crud : CrudMateriaEstudiante)
    {
     
    
        this.apiServiceMateriaEstudiante.GIUMateriaEstudiante(crud)
            .then((respuestaApi: ResponseApiestudiante | undefined) => {
              if (respuestaApi) {
                //console.log("respuestaApi");
                  //console.log(respuestaApi);
                if(respuestaApi.codigoEstado == HttpStatusCode.Ok){
        
                  let datos : any =  respuestaApi.valores;
                  this.totalRegistro = datos.lenght;
                this.listadetalleTmp = datos;
                console.log("Listadetalle");
                console.log(this.listadetalleTmp);
                this.PintarTabla(this.listadetalleTmp);
  
                  // console.log("respuesta");
                  // console.log(datos);
                }
                else{
                  // const modalRefRegister = this.ModalConfirmation("info", respuestaApi.mensaje);
                  // modalRefRegister.componentInstance.confirmation.subscribe((result: boolean) => {
                  //   modalRefRegister.close();
                  // });
        
                }            
              }
            })
            .catch((error) => {
              console.error("Error al obtener la información de la guía:", error);
            })
    }

  
  PintarTabla(_arreglo : any){
    
    const _body : any[] = [];
    
    _arreglo.forEach((element : any) => {
      _body.push({          
        nombreEstudiante : element.nombreEstudiante,
      });
    });

    this.datos_dinamicos_table_materia_estudiantes = {
      aplica_check : false,
      cuenta_acciones : false,
      aplica_historico : false,
      elimina_registro : false,
      aplica_edicion : false,
      header : [
        {Titulo : "nombreEstudiante"}
      ],
      body : _body,
      currentPage : this.currentPage,
      itemsPerPage :  this.itemsPerPage,
      
    }
    this.tablaDinamicMateriaEstudiantes.setDatos(this.datos_dinamicos_table_materia_estudiantes);
  }

}
