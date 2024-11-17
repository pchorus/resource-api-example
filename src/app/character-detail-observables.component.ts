import {Component, inject} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {map, merge, mergeMap, Subject} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'character-detail-observables',
  imports: [
    AsyncPipe
  ],
  template: `
    <h1>Character Details</h1>

    <button type="button" (click)="refresh()">Refresh</button>

    @let character = character$ | async;

    @if (character) {
      <h2>{{ character.name }}</h2>

      <dl>
        <dt>Height</dt>
        <dd>{{ character.height }}</dd>
        <dt>Mass</dt>
        <dd>{{ character.mass }}</dd>
        <dt>Birth year</dt>
        <dd>{{ character.birth_year }}</dd>
        <dt>Gender</dt>
        <dd>{{ character.gender }}</dd>
      </dl>
    }
  `
})
export class CharacterDetailObservablesComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);

  private readonly refresh$ = new Subject<void>();
  protected readonly character$ = merge(this.route.params, this.refresh$)
    .pipe(
      map(() => this.route.snapshot.params['id']),
      mergeMap(characterId => this.http.get<any>(`https://swapi.dev/api/people/${characterId}/`)),
    )

  protected refresh() {
    this.refresh$.next();
  }
}
