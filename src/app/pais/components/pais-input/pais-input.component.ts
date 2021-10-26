import {Component, EventEmitter, Output} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent {

  /*  el @Output se utiliza para devolver un evento,  y el evento le determinamos que va a devolver
  * en este caso  onEnter va a devolver un evento,  y el evento va a ser un string
  *  el @Output onDebounce va a  ir devolviendo un evento con un string, lo vamos a utilizar para que capture el valor del input
  * cada X tiempo que la persona deje de escribir*/
  /* Creo un objeto debouncer, de tipo Subjet ( es un observable )  de la librería rxjs  y con ese objeto vamos obtener los valores
  *  del input para pasarlos al Ondebounce
  *  */

  @Output() onEnter     :   EventEmitter<string> = new EventEmitter();
  @Output() onDebounce  :   EventEmitter<string> = new EventEmitter();

  debouncer             :   Subject<string> = new Subject();

  termino : string = '';

  buscar(){
    this.onEnter.emit(this.termino);
  }

}
