import { Component } from '@angular/core';

import {PaisService} from "../../services/pais.service";


@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  termino : string = '';
  hayError : boolean = false;
  datoVacio: boolean = false;
  noExiste: boolean = false;
  constructor( private paisService: PaisService) { }

  buscar(){
    console.log('el valor de termino es '+this.termino);
    this.hayError = false;
    this.datoVacio = false;
    this.noExiste = false;

    this.paisService.buscarPais(this.termino)
      .subscribe( (resp) => {
        console.log('Entró resp normal en el suscribe');
        if (resp.length === undefined)
        {
          this.noExiste=true;
          console.log('No Hay registros que coincidan con  '+ this.termino);
        }else {
          console.log('la cantidad de registros es '+resp.length);
        }

        console.log(resp);

        /*{
          "status": 404,
          "message": "Not Found"
        }*/

        // {
        //   "headers": {
        //   "normalizedNames": {},
        //   "lazyUpdate": null
        // },
        //   "status": 404,
        //   "statusText": "Not Found",
        //   "url": "https://restcountries.com/v2/name/",
        //   "ok": false,
        //   "name": "HttpErrorResponse",
        //   "message": "Http failure response for https://restcountries.com/v2/name/: 404 Not Found",
        //   "error": {
        //   "message": "Page Not Found",
        //     "_links": {
        //     "self": {
        //       "href": "/v2/name/",
        //         "templated": false
        //     }
        //   }
        // }
        // }

      }, (err) => {
        this.hayError = true;
        console.log('Entró por Error en el suscribe');
        console.info(err);
      });
  }


}
