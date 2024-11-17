import {Component, computed, inject, resource} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'character-detail-resource-api',
  template: `
    <h1>Character Details</h1>

    <button type="button" (click)="refresh()">Refresh</button>

    @let character = characterResourceRef.value();
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
export class CharacterDetailResourceApiComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly routeParams = toSignal(this.route.params);
  private readonly characterId = computed(() => this.routeParams()?.['id']);
  protected readonly characterResourceRef = resource({
    request: this.characterId,
    loader: ({ request: characterId }) => fetch(`https://swapi.dev/api/people/${characterId}/`).then(response => response.json())
  });

  protected refresh() {
    this.characterResourceRef.reload();
  }
}
