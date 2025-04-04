import { Component, OnInit } from '@angular/core';
import { TableDinamicoService } from '../../componentes/table-dinamico/table-dinamico.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lista_IndicePaginador } from '../../../environments/environment';
import { ApiMateriaEstudianteService } from '../../services/ApiMateriaEstudiante.service';
import { CrudMateriaEstudianteProfesor } from '../../swagger/ApiMateriaEstudiante/parametros/CrudMateriaEstudianteProfesor';
import { HttpStatusCode } from '@angular/common/http';
import { ResponseApiestudiante } from '../../swagger/ApiMateriaEstudiante/models/ResponseApiEstudiante';
import { CrudMaestroProfesor } from '../../swagger/ApiMateriasProfesor/parametros/CrudMaestroProfesor';

@Component({
  selector: 'app-materia-estudiante',
  templateUrl: './materia-estudiante.component.html',
  styleUrl: './materia-estudiante.component.css'
})
export class MateriaEstudianteComponent implements OnInit {
  constructor( 
    private tablaDinamicaMateriaEstudiante: TableDinamicoService,
    private apiServiceMateriaProfesor: ApiMateriaEstudianteService,
    private modalService: NgbModal,
  ){}

    // Propiedades para la paginación y filtros
    totalRegistro?: null | number = 0;
    itemsPerPage: number = 0;
    currentPage: number = 1;
    tableSizes: any = lista_IndicePaginador;
  
    // Variable con el contenido original
    listadetalleTmp: any = {};
  
    // Variables para la visualización de datos en la tabla dinámica
    datos_dinamicos_table: any = { aplica_check: false, header: [], body: [] };
  
  

  
  ngOnInit(): void {
    let Id = sessionStorage.getItem("Id_Usuario");
    let IdUsuario: number = Id !== null ? Number(Id) : 0;
    let crud: CrudMateriaEstudianteProfesor = {
          activo: true,
          idMateriaProfesor: 0,
          IdUsuarioEstudiante: IdUsuario,
          opcion: 2,
        }
        this.ListadoMaterias(crud)
  }

  ListadoMaterias(crud: CrudMateriaEstudianteProfesor) {
  
  
      this.apiServiceMateriaProfesor.GIUMateriaEstudianteProfesor(crud)
        .then((respuestaApi: ResponseApiestudiante | undefined) => {
          if (respuestaApi) {
            // console.log("respuestaApi");
            //  console.log(respuestaApi);
            if (respuestaApi.codigoEstado == HttpStatusCode.Ok) {
  
              let datos: any = respuestaApi.valores;
              this.totalRegistro = datos.lenght;
              this.listadetalleTmp = datos;
              // Llama los métodos de consumo y asignación de datos apra la grilla
              this.PintarTabla(this.listadetalleTmp);
  
               //console.log("respuesta");
              //console.log(datos);
            }
            else {
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

    PintarTabla(_arreglo: any) {

      const _body: any[] = [];
  
      _arreglo.forEach((element: any) => {
        _body.push({
          Materia: element.materia,
          NombreDocente: element.nombreDocente,
          EstadoAsignacion: element.estadoAsignacion,
          id: element.idMateriaProfesor
        });
      });
  
      this.datos_dinamicos_table = {
        aplica_check: false,
        cuenta_acciones: true,
        aplica_historico: false,
        elimina_registro: true,
        aplica_edicion: true,
        header: [
          { Titulo: "Materia" },
          { Titulo: "NombreDocente" },
          { Titulo: "EstadoAsignacion" },
        ],
        body: _body,
        currentPage: this.currentPage,
        itemsPerPage: this.itemsPerPage,
  
      }
  
      this.tablaDinamicaMateriaEstudiante.setDatos(this.datos_dinamicos_table);
  
    }


  VisualizarIdMateria($event: { _id: number; }) {
    throw new Error('Method not implemented.');
  }
  EliminarMateria(datos: { _id: number; }) {
    let Id = sessionStorage.getItem("Id_Usuario");
    let IdUsuario: number = Id !== null ? Number(Id) : 0;
    let IdMateria = datos._id
    let crud: CrudMateriaEstudianteProfesor = {
     activo: false,
     idMateriaProfesor: IdMateria,
     IdUsuarioEstudiante: IdUsuario,
     opcion: 1,
   }
   this.ListadoMaterias(crud)
  }
  AsignacionMateria(datos: { _id: number; }) {
   let Id = sessionStorage.getItem("Id_Usuario");
       let IdUsuario: number = Id !== null ? Number(Id) : 0;
       let IdMateria = datos._id
       let crud: CrudMateriaEstudianteProfesor = {
        activo: true,
        idMateriaProfesor: IdMateria,
        IdUsuarioEstudiante: IdUsuario,
        opcion: 1,
      }
      this.ListadoMaterias(crud)
  }



}
