import { NgModule } from '@angular/core';
import {RouterModule,Routes} from "@angular/router";
import {PorPaisComponent} from "./pais/pages/por-pais/por-pais.component";
import {PorRegionComponent} from "./pais/pages/por-region/por-region.component";
import {PorCapitalComponent} from "./pais/pages/por-capital/por-capital.component";
import {VerPaisComponent} from "./pais/pages/ver-pais/ver-pais.component";

//Aqui defino las rutas del proyecto, le digo que en la raíz de la ruta me muestre PorPaisComponent, es la configuración principal de la ruta de mi app
//el pathMach:'full'  habla que esa es la ruta completa,  no que no hay nada mas a la derecha de la raiz
//en el path 'pais/:id'  cuando pongo los dos puntos le digo que es una ruta dinámica,  representada por la variable id que acabo de nombrar ahí
// en el path '**' indica que si es cualquier otro path que no esté nombrado en los anteriores
const routes: Routes = [
  {
    path: '',
    component: PorPaisComponent,
    pathMatch:'full'
  },
  {
    path: 'region',
    component: PorRegionComponent
  },
  {
    path: 'capital',
    component: PorCapitalComponent
  },
  {
    path: 'pais/:id',
    component: VerPaisComponent
  },
  {
    path: '**',
    redirectTo: ''
  }

];


@NgModule({
  imports : [
      RouterModule.forRoot( routes )
  ],
  exports : [
      RouterModule
  ]

})



export class AppRoutingModule {}

