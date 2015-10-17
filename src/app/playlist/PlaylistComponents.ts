import { LocalStoragePlayList } from './PlaylistBackend';
import { ConcertSummary, VideoPlayer } from '../search/YTLiveBackend';
import {Component, Directive, View, bootstrap, NgFor, NgIf, FORM_DIRECTIVES, EventEmitter} from 'angular2/angular2';

@Component({
  selector: 'playlist-entry',
  properties: ["entry"]

})
@View({
  templateUrl: "app/playlist/playlistentry.html"
})
class PlaylistEntryComponent {
  entry: ConcertSummary

  constructor(private playlistService: LocalStoragePlayList,
     private videoPlayer: VideoPlayer) { }

  removeEntry(concert: ConcertSummary) {
    this.playlistService.removeConcert(concert.id);
  }

  playConcert(id: string) {
    this.videoPlayer.playConcert(id);
  }
}

@Component({
  selector: 'playlist',
  bindings: [LocalStoragePlayList]
})
@View({
  templateUrl: "app/playlist/playlist.html",
  directives: [NgFor, PlaylistEntryComponent]
})
export class PlaylistComponent {

  constructor(private playlistService: LocalStoragePlayList) { }

  get entries(): ConcertSummary[] {
    return this.playlistService.getPlaylist();
  }

}
