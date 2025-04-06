import { Component, OnInit } from '@angular/core';
import { TableDinamicoService } from '../../componentes/table-dinamico/table-dinamico.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lista_IndicePaginador } from '../../../environments/environment';
import { ApiMateriaEstudianteService } from '../../services/ApiMateriaEstudiante.service';
import { CrudMateriaEstudianteProfesor } from '../../swagger/ApiMateriaEstudiante/parametros/CrudMateriaEstudianteProfesor';
import { HttpStatusCode } from '@angular/common/http';
import { ResponseApiestudiante } from '../../swagger/ApiMateriaEstudiante/models/ResponseApiEstudiante';
import { ModalEstudiantesMateriaComponent } from '../../componentes/modal-estudiantes-materia/modal-estudiantes-materia.component';
import { ModalDeNotificacionComponent } from '../../componentes/modal-de-notificacion/modal-de-notificacion.component';

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
    datosconsulta : any;
  
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
            if (respuestaApi.codigoEstado == HttpStatusCode.Ok) {
  
              let datos: any = respuestaApi.valores;
              this.datosconsulta = datos;
              this.totalRegistro = datos.lenght;
              this.listadetalleTmp = datos;
              // Llama los métodos de consumo y asignación de datos apra la grilla
              this.PintarTabla(this.listadetalleTmp);
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
        aplica_historico: true,
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


  VisualizarIdMateria(datos: { _id: number; }) {
       const activeModal = this.modalService.open(ModalEstudiantesMateriaComponent, {
         size: 'lg',
         backdrop: 'static',
         keyboard: false,
       });
   
       activeModal.componentInstance._datosdetalle = {
         idMateria: datos._id,
       };
   
       activeModal.componentInstance.confirmation.subscribe((data: { confirmacion: boolean }) => {
         activeModal.close();
       });
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
      let ConteoAsignados = this.ValidarAsignacionProfesor(IdMateria,this.datosconsulta);
      if  (ConteoAsignados < 1)
      {
        let conteoClases = this.ValidarCantidadClases(this.datosconsulta);
        if (conteoClases < 3)
        {
          this.ListadoMaterias(crud);
        }
        else{
          let mensaje_personalizado : string ='';
          mensaje_personalizado = `<div class="alineacion-texto"><span class="texto-title-msj"><p>Error: no puede seleccionar mas clases de las permitidas, `+
          `debe desasignar una de las clases ya tomadas.</p></span><br><br>`+
                                   `</div>`;
          this.VisualizarModalInformativo(mensaje_personalizado);
        }
      }
      else{
        let mensaje_personalizado : string ='';
          mensaje_personalizado = `<div class="alineacion-texto"><span class="texto-title-msj"><p>Error: no puede seleccionar mas clases con el mismo profesor, `+
          `debe desasignar una de las clases ya tomadas.</p></span><br><br>`+
                                   `</div>`;
          this.VisualizarModalInformativo(mensaje_personalizado);
      }   
  }

  ValidarAsignacionProfesor(IdMateriaProfesor : number, datos : any) : number{
    let response : string ='';
    let IdProfesor : number = datos?.filter((item: { idMateriaProfesor: number; } ) => item.idMateriaProfesor === IdMateriaProfesor).map((dat: { idProfesor: any; }) => dat.idProfesor)[0] || 0;
    let filtrados: any = datos?.filter((item: { idProfesor: number; }) => item.idProfesor ===  IdProfesor) || 0;
    let ConteoAsignados = filtrados?.filter((x: { estadoAsignacion: string; }) => x.estadoAsignacion === 'Asignada').length || 0;
    return ConteoAsignados;
  }


  
    // Método para invocar el modal informativo de mensajes
    ModalConfirmation(type: string, message?: string | null) {
      const modalRef = this.modalService.open(ModalDeNotificacionComponent, {
        centered: true,
        backdrop: 'static',
        keyboard: false,
      });
  
      modalRef.componentInstance.type = type;
      modalRef.componentInstance.texto_confirmacion = message;
  
      return modalRef;
    }

  
    ValidarCantidadClases( datos : any) : number{
      let cantidadClases = datos?.filter((item: { estadoAsignacion: string; }) => item.estadoAsignacion === 'Asignada').length || 0;
      return cantidadClases;
    }

    VisualizarModalInformativo(mensaje : string)
    {
       const modalRefRegister = this.ModalConfirmation("html", mensaje);
       modalRefRegister.componentInstance.confirmation.subscribe((result: boolean) => {
         modalRefRegister.close();
       });
    }
}
