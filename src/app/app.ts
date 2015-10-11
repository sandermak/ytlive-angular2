/// <reference path="../typings/tsd.d.ts" />

import {Component, Directive, View, bootstrap, NgFor, NgIf} from 'angular2/angular2';
import * as ytbackend from './YTLiveBackend';
import * as plbackend from './PlaylistBackend';

@Component({
  selector: 'search-result',
  properties: ["concert"]
})
@View({
  templateUrl: "app/searchresult.html",
  directives: []
})
class SearchResultComponent {
  concert: ytbackend.ConcertSummary
}

@Component({
  selector: 'search',
  bindings: [ytbackend.ConcertService]
})
@View({
  templateUrl: "app/search.html",
  directives: [NgFor, NgIf, SearchResultComponent]
})
class SearchComponent {
  concerts: ytbackend.ConcertSummary[]

  constructor(concertService: ytbackend.ConcertService) {
    this.concerts = concertService.findConcerts("some artist");
  }
}

@Component({
  selector: 'playlist-entry',
  properties: ["entry"]
})
@View({
  templateUrl: "app/playlistentry.html",
  directives: []
})
class PLaylistEntryComponent {
  entry: ytbackend.ConcertSummary
}

@Component({
  selector: 'playlist',
  bindings: [plbackend.LocalStoragePlayList]
})
@View({
  templateUrl: "app/playlist.html",
  directives: [NgFor, PLaylistEntryComponent]
})
class PlaylistComponent {
  entries: ytbackend.ConcertSummary[]
  constructor(playlistService: plbackend.LocalStoragePlayList) {
    this.entries = playlistService.getPlaylist();
  }
}

@Component({
  selector: 'yt-live'
})
@View({
  templateUrl: "app/ytlive.html",
  directives: [SearchComponent, PlaylistComponent]
})
class YTLiveComponent {

}

bootstrap(YTLiveComponent);
