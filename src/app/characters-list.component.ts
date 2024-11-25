import {Component} from "@angular/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'character-list',
  imports: [
    RouterLink
  ],
  template: `
    <h1>Star Wars Characters</h1>
    <ul>
      @for (character of people; track character.id) {
        <li>
          <p>{{ character.name }}</p>
          <span>Link to details page via</span>
          <a [routerLink]="['observables', character.id]">observables</a>
          <a [routerLink]="['signals', character.id]">signals</a>
          <a [routerLink]="['resource-api', character.id]">resource api</a>
        </li>
      }
    </ul>
  `,
  styles: 'a, span { margin-right: 10px; }'
})
export class CharacterListComponent {
  protected readonly people = [
    { id: 1, name: 'Luke Skywalker'},
    { id: 2, name: 'C-3PO'},
    { id: 3, name: 'R2-D2'}
  ];
}
