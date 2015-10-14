import {Component, Directive, View, bootstrap, NgFor, NgIf, FORM_DIRECTIVES, EventEmitter} from 'angular2/angular2';
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

  constructor(private playlistService: plbackend.LocalStoragePlayList,
     private videoPlayer: ytbackend.VideoPlayer) {}

  addToPlaylist(concert: ytbackend.ConcertSummary) {
    console.log('adding', concert);
    this.playlistService.addConcert(concert);
  }

  playConcert(id: string) {
    console.log('play', id);
    this.videoPlayer.playConcert(id);
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

  private _concerts: ytbackend.ConcertSummary[] = [];

  constructor(private concertService: ytbackend.ConcertService,
      private videoPlayer: ytbackend.VideoPlayer) { }

  get concerts(): ytbackend.ConcertSummary[] {
    return this._concerts;
  }
  get playing() {
    console.log('got playing state', this.videoPlayer.isPlaying)
    return this.videoPlayer.isPlaying;
  }

  get embedUrl() {
    return this.videoPlayer.currentVideoUrl;
  }

  searchConcerts(): void {
    this.videoPlayer.stop();
    this.concertService
      .findConcerts(this.searchTerm)
      .subscribe((results: ytbackend.ConcertSummary[]) => this._concerts = results);
    console.log('searching', this.searchTerm, this.duration);
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

  constructor(private playlistService: plbackend.LocalStoragePlayList,
     private videoPlayer: ytbackend.VideoPlayer) { }

  removeEntry(concert: ytbackend.ConcertSummary) {
    this.playlistService.removeConcert(concert.id);
  }

  playConcert(id: string) {
    this.videoPlayer.playConcert(id);
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
  selector: 'yt-live',
  bindings: [ytbackend.VideoPlayer]
})
@View({
  templateUrl: "app/ytlive.html",
  directives: [SearchComponent, PlaylistComponent]
})
class YTLiveComponent { }

bootstrap(YTLiveComponent, [HTTP_BINDINGS]);
