import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shuttle-dual-card',
  templateUrl: 'shuttle.dual.heading.card.html',
  styleUrls: ['shuttle.dual.heading.card.scss']
})
export class ShuttleDualHeadingCardComponent {
  @Input() stopName: string;
  @Input() timeDeltaDH: number;
  @Input() timeDeltaDY: number;
  @Input() timeDeltaC: number;
  constructor() {}
}
