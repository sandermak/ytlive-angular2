import { Component, View, bootstrap } from 'angular2/angular2';
import { HTTP_PROVIDERS } from 'angular2/http'
import { VideoPlayer } from './search/YTLiveBackend';
import { PlaylistComponent } from './playlist/PlaylistComponents'
import { SearchComponent } from './search/SearchComponents';

@Component({
  selector: 'yt-live',
  providers: [VideoPlayer]
})
@View({
  templateUrl: "ytlive/ytlive.html",
  directives: [SearchComponent, PlaylistComponent]
})
class YTLiveComponent { }

bootstrap(YTLiveComponent, [HTTP_PROVIDERS]);
