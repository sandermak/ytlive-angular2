import { Component, View, NgFor } from 'angular2/angular2';
import { LocalStoragePlayList } from './PlaylistBackend';
import { ConcertSummary, VideoPlayer } from '../search/YTLiveBackend';

@Component({
  selector: 'playlist-entry',
  properties: ["entry"]

})
@View({
  templateUrl: "ytlive/playlist/playlistentry.html"
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
  providers: [LocalStoragePlayList]
})
@View({
  templateUrl: "ytlive/playlist/playlist.html",
  directives: [NgFor, PlaylistEntryComponent]
})
export class PlaylistComponent {

  constructor(private playlistService: LocalStoragePlayList) { }

  get entries(): ConcertSummary[] {
    return this.playlistService.getPlaylist();
  }

}
