import { Component, OnInit } from '@angular/core';
/*   Este import sirve para usar el objeto switchmap  - permite recibir un observable y regresar otro observable */
import { switchMap,tap} from 'rxjs/operators';


import {ActivatedRoute} from "@angular/router";
import {PaisService} from "../../services/pais.service";
import {Country} from "../../interfaces/pais.interface";

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  /* creo un objeto de tipo country que se llame pais */
  /* el signo de !  al final de pais,  con esto le digo a typescript que confíe en mi,  que el objeto
  * pais  puede llegar nullo y está bien. Si no le pongo el signo !  a pais,  lo que pasa es que saca error
  * porque un objeto de tipo Country no puede ser null. entonces con ese signo le digo que lo acepte null, que confie en mi
  * quiere decir que lo trate siempre como un objeto de tipo Country a pesar que sea null */
  pais!: Country;


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
        * switchMap recibe el observable params y captura el observable por codigo
        * luego con el tap, disparo un efecto secundario en este caso el console.log
        * la estoy mandando a llamar apenas pase por ese punto
        * el tap recibe el producto del observable, e imprime en consola lo que encuentre  */

        switchMap( ({id}) =>this.paisService.getPaisPorcodigo(id) ),
        tap( console.log )
      )
      .subscribe( /*  Aqui estoy diciendo en este subscribe, que a la variable que creé arriba tipo Country
       que se llama pais (this.pais),  le lleve el valor que recibo como argumento  "pais"  */ pais => {
        this.pais = pais;
      });

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
