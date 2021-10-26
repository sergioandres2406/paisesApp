import { Component } from '@angular/core';

import {PaisService} from "../../services/pais.service";
import {Country} from "../../interfaces/pais.interface";


@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  termino  : string = '';
  hayError : boolean = false;
  datoVacio: boolean = false;
  noExiste : boolean = false;
  sinBuscar: boolean = true;
  objPaises: Country [] = [];

  constructor( private paisService: PaisService) { }

  buscar(termino:string){
    console.log('el valor de termino es '+this.termino);
    this.hayError = false;
    this.datoVacio = false;
    this.noExiste = false;
    this.termino = termino;

    /* Aqui utilizo la función buscarpais del servicio pais.service    con el valor que capture del parámetro termino
    *  */
    this.paisService.buscarPais(this.termino)
      .subscribe( (resp) => {
        console.log('Entró resp normal en el suscribe');
        if (resp.length === undefined)
        {
          this.noExiste=true;
          console.log('No Hay registros que coincidan con  '+ this.termino);
        }else {
          this.objPaises = resp;
          this.sinBuscar = false;
          console.log('la cantidad de registros es '+resp.length);
        }

        console.log(this.objPaises);



      }, (err) => {
        this.hayError = true;
        console.log('Entró por Error en el suscribe');
        console.info(err);
        this.objPaises = [];
      });
  }


}
