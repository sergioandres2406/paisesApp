import { Component, OnInit } from '@angular/core';
/*   Este import sirve para usar el objeto switchmap  - permite recibir un observable y regresar otro observable */
import { switchMap} from 'rxjs/operators';

import {ActivatedRoute} from "@angular/router";
import {PaisService} from "../../services/pais.service";

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {
  /*  definimos en el constructor el objeto  activatedRoute de la libreria  ActivatedRoute
  * definimos  el objeto paisService del servicio  pais.service */
  constructor(
    private activatedRoute: ActivatedRoute,
    private  paisService   :  PaisService
  ) { }

  ngOnInit(): void {

   /* ESTE CODIGO HACE LO MISMO QUE EL DE ABAJO QUE ESTÁ CONECTADO, DE OTRA FORMA */

    this.activatedRoute.params
      .pipe(
        /* dentro del pipe puedo especificar operadores que van a trabajar con el producto del observable
        * en este caso vamos a usar el switchmap ( declaramos el import de rxjs
        * switchMap recibe el observable params y captura el observable por codigo   */

        switchMap( ({id}) =>this.paisService.getPaisPorcodigo(id) )
      )
      .subscribe( pais => {
        console.log(pais);
      })

    /*  cuando inicia el servicio  cargamos el activateRoute,  y nos devuelve el observable params.
    *  params nos devuelve en este caso la ruta de id - el cual definimos en app-routing module (pais/:id)
    * en este caso params nos va a traer el valor que hay en ":id" en la ruta de pais*/
    // this.activatedRoute.params
    //   .subscribe( ({id}) => {
    //     this.paisService.getPaisPorcodigo(id)
    //       .subscribe( pais =>{
    //         console.log(pais);
    //     })
    //     console.log(id);
    //   })
  }

}
