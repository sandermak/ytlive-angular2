import {Component, Directive, View, bootstrap, NgFor, NgIf, FORM_DIRECTIVES, EventEmitter} from 'angular2/angular2';
import { HTTP_BINDINGS } from 'angular2/http'
import { VideoPlayer } from './search/YTLiveBackend';
import { PlaylistComponent } from './playlist/PlaylistComponents'
import { SearchComponent } from './search/SearchComponents';

@Component({
  selector: 'yt-live',
  bindings: [VideoPlayer]
})
@View({
  templateUrl: "ytlive/ytlive.html",
  directives: [SearchComponent, PlaylistComponent]
})
class YTLiveComponent { }

bootstrap(YTLiveComponent, [HTTP_BINDINGS]);
