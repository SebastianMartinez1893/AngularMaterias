import { Component, OnInit } from '@angular/core';
import { TableDinamicoService } from '../../componentes/table-dinamico/table-dinamico.service';
import { ApiMateriaProfesorService } from '../../services/ApiMateriaProfesor.service';
import { CrudMaestroProfesor } from '../../swagger/ApiMateriasProfesor/parametros/CrudMaestroProfesor';
import { RespuestaApi } from '../../swagger/ApiMateriasProfesor/models/RespuestaApi';
import { HttpStatusCode } from '@angular/common/http';
import { lista_IndicePaginador } from '../../../environments/environment';
import { ModalMateriaEstudiantesComponent } from '../../componentes/modal-materia-estudiantes/modal-materia-estudiantes.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-materia-profesor',
  templateUrl: './materia-profesor.component.html',
  styleUrl: './materia-profesor.component.css'
})
export class MateriaProfesorComponent implements OnInit {



  constructor(
    private tablaDinamic: TableDinamicoService,
    private apiServiceMateriaProfesor: ApiMateriaProfesorService,
    private modalService: NgbModal,
  ) { }

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
    let crud: CrudMaestroProfesor = {
      estado: true,
      idMateria: 0,
      idProfesor: 0,
      opcion: 2,
    }
    this.ListadoMaterias(crud)
  }

  ListadoMaterias(crud: CrudMaestroProfesor) {


    this.apiServiceMateriaProfesor.IUMateriaProfesor(crud)
      .then((respuestaApi: RespuestaApi | undefined) => {
        if (respuestaApi) {
          //console.log("respuestaApi");
          // console.log(respuestaApi);
          if (respuestaApi.codigoEstado == HttpStatusCode.Ok) {

            let datos: any = respuestaApi.valores;
            this.totalRegistro = datos.lenght;
            this.listadetalleTmp = datos;
            // Llama los métodos de consumo y asignación de datos apra la grilla
            this.PintarTabla(this.listadetalleTmp);

            //  console.log("respuesta");
            // console.log(datos);
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
        estado: element.estado,
        nombreDocente: element.nombreDocente,
        id: element.idMateria
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
        { Titulo: "Estado" },
        { Titulo: "Docente" },
      ],
      body: _body,
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage,

    }

    this.tablaDinamic.setDatos(this.datos_dinamicos_table);

  }


  VisualizarIdMateria(datos: { _id: number; }) {
    // console.log("IdMateria");
    console.log(datos._id);

    const activeModal = this.modalService.open(ModalMateriaEstudiantesComponent, {
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

  AsignacionMateria(datos: { _id: number; }) {
    let Id = sessionStorage.getItem("Id_Usuario");
    let IdUsuario: number = Id !== null ? Number(Id) : 0;
    let IdMateria = datos._id
    let crud: CrudMaestroProfesor = {
      estado: true,
      idMateria: IdMateria,
      idProfesor: IdUsuario,
      opcion: 1,
    }
    this.ListadoMaterias(crud)
  }

  EliminarMateria(datos: { _id: number; }) {
    let Id = sessionStorage.getItem("Id_Usuario");
    let IdUsuario: number = Id !== null ? Number(Id) : 0;
    let IdMateria = datos._id
    let crud: CrudMaestroProfesor = {
      estado: false,
      idMateria: IdMateria,
      idProfesor: IdUsuario,
      opcion: 1,
    }
    this.ListadoMaterias(crud)
  }
}
