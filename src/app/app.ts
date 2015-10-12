/// <reference path="../typings/tsd.d.ts" />

import {Component, Directive, View, bootstrap, NgFor, NgIf} from 'angular2/angular2';
import { HTTP_BINDINGS } from 'angular2/http'
import * as ytbackend from './YTLiveBackend';
import * as plbackend from './PlaylistBackend';

@Component({
  selector: 'search-result',
  properties: ["concert"],
  bindings: [plbackend.LocalStoragePlayList]
})
@View({
  templateUrl: "app/searchresult.html",
  directives: []
})
class SearchResultComponent {
  concert: ytbackend.ConcertSummary

  constructor(private playlistService: plbackend.LocalStoragePlayList) {}

  addToPlaylist(concert: ytbackend.ConcertSummary) {
    console.log('adding', concert);
    this.playlistService.addConcert(concert);
  }
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

  private _concerts: ytbackend.ConcertSummary[] = [];

  constructor(private concertService: ytbackend.ConcertService) {
    this.concertService
      .findConcerts("some artist")
      .subscribe((results: ytbackend.ConcertSummary[]) => this._concerts = results);
  }

  get concerts(): ytbackend.ConcertSummary[] {
    return this._concerts;
  }
}

@Component({
  selector: 'playlist-entry',
  properties: ["entry"]

})
@View({
  templateUrl: "app/playlistentry.html"
})
class PlaylistEntryComponent {
  entry: ytbackend.ConcertSummary

  constructor(private playlistService: plbackend.LocalStoragePlayList) {}

  removeEntry(concert: ytbackend.ConcertSummary) {
    this.playlistService.removeConcert(concert.id);
  }
}

@Component({
  selector: 'playlist',
  bindings: [plbackend.LocalStoragePlayList]
})
@View({
  templateUrl: "app/playlist.html",
  directives: [NgFor, PlaylistEntryComponent]
})
class PlaylistComponent {

  constructor(private playlistService: plbackend.LocalStoragePlayList) { }

  get entries(): ytbackend.ConcertSummary[] {
    return this.playlistService.getPlaylist();
  }

}

@Component({
  selector: 'yt-live'
})
@View({
  templateUrl: "app/ytlive.html",
  directives: [SearchComponent, PlaylistComponent]
})
class YTLiveComponent { }

bootstrap(YTLiveComponent, [HTTP_BINDINGS]);
