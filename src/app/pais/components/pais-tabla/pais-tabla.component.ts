import { Component,Input, OnInit } from '@angular/core';
import {Country} from "../../interfaces/pais.interface";


@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html',
  styles: [
  ]
})
export class PaisTablaComponent implements OnInit {

  constructor() { }


  @Input() objPaises: Country[] = [];
  @Input() hayError : boolean = false;
  @Input() datoVacio: boolean = false;
  @Input()  noExiste : boolean = false;
  @Input() sinBuscar: boolean = true;

  ngOnInit(): void {
  }

}
