import { Component, Input } from '@angular/core';


import  {PaisService} from "../../services/pais.service";
import {Country} from "../../interfaces/pais.interface";


@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent  {

  termino  : string = '';
  hayError : boolean = false;
  datoVacio: boolean = false;
  noExiste : boolean = false;
  sinBuscar: boolean = true;
  objPaises: Country [] = [];
  @Input()  namePage : string = 'capital';

  constructor(private paisService: PaisService) { }

  buscar(termino:string) {
    console.log('el valor de termino es ' + this.termino);
    this.hayError = false;
    this.datoVacio = false;
    this.noExiste = false;
    this.termino = termino;
    /* Aqui utilizo la función buscarpaiscapital del servicio pais.service    con el valor que capture del parámetro termino
    * para poder recibir  el objeto "observable"  que es el que devuelve la función buscarPaiscapital(), debo usar el subscribe  */
    this.paisService.buscarPaiscapital(this.termino)
      .subscribe((resp) =>{
        console.log('Entro resp normal en el subscribe de buscar por capital');
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
