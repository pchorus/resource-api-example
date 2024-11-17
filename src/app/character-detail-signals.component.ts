import {Component, computed, inject} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {map, merge, mergeMap, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'character-detail-signals',
  template: `
    <h1>Character Details</h1>

    <button type="button" (click)="refresh()">Refresh</button>

    @if (character()) {
      <h2>{{ character().name }}</h2>

      <dl>
        <dt>Height</dt>
        <dd>{{ character().height }}</dd>
        <dt>Mass</dt>
        <dd>{{ character().mass }}</dd>
        <dt>Birth year</dt>
        <dd>{{ character().birth_year }}</dd>
        <dt>Gender</dt>
        <dd>{{ character().gender }}</dd>
      </dl>
    }
  `
})
export class CharacterDetailSignalsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);

  private readonly refresh$ = new Subject<void>();

  private readonly routeParams = toSignal(this.route.params);
  private readonly characterId = computed(() => this.routeParams()?.['id']);
  protected readonly character = toSignal(
    merge(toObservable(this.characterId), this.refresh$)
      .pipe(
        map(() => this.route.snapshot.params['id']),
        mergeMap(characterId => this.http.get<any>(`https://swapi.dev/api/people/${characterId}/`))
      )
    );

  protected refresh() {
    this.refresh$.next();
  }
}
