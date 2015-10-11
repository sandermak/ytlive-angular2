/// <reference path="../typings/tsd.d.ts" />

import {Component, View, bootstrap, NgFor, Query} from 'angular2/angular2';
import * as backend from './YTLiveBackend';

@Component({
  selector: 'yt-live',
  viewBindings: [backend.ConcertService]
})
@View({
  templateUrl: "app/ytlive.html",
    directives: [NgFor]
})
class YTLiveComponent {
  concerts: backend.ConcertSummary[]

  constructor(concertService: backend.ConcertService) {
    this.concerts = concertService.findConcerts("some artist");
  }
}

bootstrap(YTLiveComponent);
