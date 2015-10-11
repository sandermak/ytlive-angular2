/// <reference path="../typings/tsd.d.ts" />

import {Component, Directive, View, bootstrap, NgFor, NgIf} from 'angular2/angular2';
import * as backend from './YTLiveBackend';

@Component({
  selector: 'search-result',
  properties: ["concert"]
})
@View({
  templateUrl: "app/searchresult.html",
  directives: []
})
class SearchResultComponent {
  concert: backend.ConcertSummary

  constructor() {
    console.log("concert", this.concert);
  }

}

@Component({
  selector: 'search',
  viewBindings: [backend.ConcertService]
})
@View({
  templateUrl: "app/search.html",
  directives: [NgFor, NgIf, SearchResultComponent]
})
class SearchComponent {
  concerts: backend.ConcertSummary[]

  constructor(concertService: backend.ConcertService) {
    console.log("SearchComponent instantiated")
    this.concerts = concertService.findConcerts("some artist");
  }
}


@Component({
  selector: 'yt-live'
})
@View({
  templateUrl: "app/ytlive.html",
  directives: [SearchComponent]
})
class YTLiveComponent {

}



bootstrap(YTLiveComponent);
