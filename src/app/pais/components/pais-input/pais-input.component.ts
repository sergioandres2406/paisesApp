import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";


@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
/* cuando pongo Oninit es para definir valores cuando se carga el componente
*  */
export class PaisInputComponent implements OnInit {

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

  @Input() namePage : string = '';

  /* el ngOnInit se inicializa una unica vez cuando el componente es llamado */
  ngOnInit(): void {
    /*  con el pipe estoy definiendo una tubería  o una conexión  que me permita transformar la salida del subscribe   */
    /*  Aqui me estoy suscribiendo al evento del debouncer donde obtendríamos el "valor buscado " o el valor
    * almacenado en el input  */

    this.debouncer
      .pipe(
        /*el  debouncetime es de 300 milisegundos,  o sea que cada 300 milisegundos despues de presionar la tecla captura el valor
        * en otras palabras,  no haga subscribe  o captura de lo que haya en el valor,  hasta despues de 300 milisegundos  de haber tocado una tecla*/
        debounceTime(300)
      )
      .subscribe(valor => {
      console.log("Valor del Debouncer: ",  valor);
      this.onDebounce.emit(valor);
    })
  }


  buscar(){
    this.onEnter.emit(this.termino);
  }

    /*  voy a recibir en esta función un  event de tipo  any,
    * extraigo el valor con event.target.value  */
  teclaPresionada(){

        /* aqui llamo el debouncer y le digo que me traiga  el valor que hay en ese momento el input */
        this.debouncer.next(this.termino);
  }

}
