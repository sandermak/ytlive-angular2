/// <reference path="../typings/tsd.d.ts" />

import {Component, Directive, View, bootstrap, NgFor, NgIf, FORM_DIRECTIVES, EventEmitter} from 'angular2/angular2';
import { HTTP_BINDINGS } from 'angular2/http'
import * as ytbackend from './YTLiveBackend';
import * as plbackend from './PlaylistBackend';

@Component({
  selector: 'search-result',
  properties: ["concert"],
  bindings: [plbackend.LocalStoragePlayList],
  events: ['playconcert']
})
@View({
  templateUrl: "app/searchresult.html",
  directives: []
})
class SearchResultComponent {
  playconcert = new EventEmitter();
  concert: ytbackend.ConcertSummary

  constructor(private playlistService: plbackend.LocalStoragePlayList) {}

  addToPlaylist(concert: ytbackend.ConcertSummary) {
    console.log('adding', concert);
    this.playlistService.addConcert(concert);
  }

  playConcert(id: string) {
    console.log('play', id);
    this.playconcert.next(id);
  }
}

@Component({
  selector: 'search',
  bindings: [ytbackend.ConcertService]
})
@View({
  templateUrl: "app/search.html",
  directives: [NgFor, NgIf, SearchResultComponent, FORM_DIRECTIVES]
})
class SearchComponent {
  searchTerm: string
  duration: string
  playing = false;
  embedUrl: string;

  private _concerts: ytbackend.ConcertSummary[] = [];

  constructor(private concertService: ytbackend.ConcertService) { }

  get concerts(): ytbackend.ConcertSummary[] {
    return this._concerts;
  }

  searchConcerts(): void {
    this.playing = false;
    this.concertService
      .findConcerts(this.searchTerm)
      .subscribe((results: ytbackend.ConcertSummary[]) => this._concerts = results);
    console.log('searching', this.searchTerm, this.duration);
  }

  playConcert(id: string) {
    this.playing = true;
    this.embedUrl = this.concertService.concertIdToEmbedUrl(id);
    console.log('searchplay', this.embedUrl);
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
