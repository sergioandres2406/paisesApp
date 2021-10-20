import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Country} from "../interfaces/pais.interface";

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  //aqui vamos a poner la raíz de la url en la variable apiUrl
  private  apiUrl: string = 'https://restcountries.com/v2';

  constructor(private http: HttpClient ) { }

  buscarPais(termino: string): Observable<Country[]> {

    //AQUI ARMAMOS LA URL PARA CONSUMIR EL SERVICIO DE BUSQUEDA POR NOMBRE DE PAIS
    const url = `${this.apiUrl}/name/${termino}`
    return this.http.get<Country[]>(url);
  }

}
