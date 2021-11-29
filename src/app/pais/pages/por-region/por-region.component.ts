import { Component} from '@angular/core';

import {PaisService} from "../../services/pais.service";
import {Country} from "../../interfaces/pais.interface";

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `button {  margin-right: 5px;  }`
  ]
})
export class PorRegionComponent  {
  regiones: string [] = ['EU (European Union)', 'EFTA (European Free Trade Association)',
    'CARICOM (Caribbean Community)', 'PA (Pacific Alliance)', 'AU (African Union)',
    'USAN (Union of South American Nations)','EEU (Eurasian Economic Union)',
    'AL (Arab League)','ASEAN (Association of Southeast Asian Nations)',
    'CAIS (Central American Integration System)','CEFTA (Central European Free Trade Agreement)',
    'NAFTA (North American Free Trade Agreement)','SAARC (South Asian Association for Regional Cooperation)'
  ];
  regionActiva: string = '';
  termino : string = '';
  primerespacio: number = 0;
  datoVacio: boolean = false;
  noExiste : boolean = false;
  sinBuscar: boolean = true;
  objPaises: Country [] = [];
  codigoRegionSeleccionado : string = '';
  hayError : boolean = false;

  constructor( private  paisService: PaisService) { }




  getClaseCSS (region: string) : string {
    return (region === this.regionActiva) ? 'btn btn-primary': 'btn btn-outline-primary';
  }

  activarRegion(region: string)
  {
    //esta linea lo que hace es validar que si pisé la región que ya está
    // Activa, entonces no hará nada
    if (region === this.regionActiva) {return;}

    this.regionActiva = region;
    this.objPaises = [];
    this.primerespacio = this.regionActiva.indexOf(" ");
    this.codigoRegionSeleccionado =  this.regionActiva.substring(0,this.primerespacio) ;
    this.hayError = false;
    this.datoVacio = false;
    this.noExiste = false;
    this.termino = this.codigoRegionSeleccionado;

    this.paisService.buscarRegion(this.termino)
      .subscribe( resp => {
        console.log('codigo de region seleccionado: '+ this.termino);
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
      },error => {
        this.hayError = true;
        console.log('Entró por Error en el suscribe');
        console.info(error);
        this.objPaises = [];
      });

  }


}
