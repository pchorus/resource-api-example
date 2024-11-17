import { Routes } from '@angular/router';
import {CharacterListComponent} from "./characters-list.component";
import {CharacterDetailObservablesComponent} from "./character-detail-observables.component";
import {CharacterDetailSignalsComponent} from "./character-detail-signals.component";
import {CharacterDetailResourceApiComponent} from "./character-detail-resource-api.component";

export const routes: Routes = [
  {
    path: '',
    component: CharacterListComponent
  },
  {
    path: 'observables/:id',
    component: CharacterDetailObservablesComponent
  },
  {
    path: 'signals/:id',
    component: CharacterDetailSignalsComponent
  },
  {
    path: 'resource-api/:id',
    component: CharacterDetailResourceApiComponent
  }
];
