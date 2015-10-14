/// <reference path="../typings/tsd.d.ts" />

import { Injectable } from 'angular2/angular2'
import { Http } from 'angular2/http'

var API_KEY = 'AIzaSyCIA2JXdGQ2hDM_08KpBJgbYJdalGCZqyg';
var yt_search = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&key=' +
    API_KEY + '&videoCategoryId=10&videoEmbeddable=true&type=video&videoDuration=';
var yt_embed = 'https://www.youtube.com/embed/'

interface YTSearchResult {
    id: { videoId: string };
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            medium: {
                url: string;
            };
        }
    }
}

export class ConcertSummary {
    constructor(public id: string,
                public previewImg: string,
                public title: string,
                public desc: string) {

    }
}

export enum Duration { SONG, SET, FULLCONCERT }

export class VideoPlayer {
  public isPlaying = false;
  public currentVideoUrl: string

  public playConcert(id: string) {
    console.log('service play', id)
    this.isPlaying = true;
    this.currentVideoUrl = this.concertIdToEmbedUrl(id);
  }

  public stop() {
    this.isPlaying = false;
    this.currentVideoUrl = undefined;
  }

  private concertIdToEmbedUrl(id: string): string {
    return yt_embed + id + '?showinfo=0&autoplay=1';
  }
}

@Injectable()
export class ConcertService {

  private concerts: ConcertSummary[];

  constructor(private http: Http) { }

  public findConcerts(artist: string, duration = Duration.FULLCONCERT): any {
    var ytDuration: string;
    switch(duration) {
        case Duration.SONG:
            ytDuration = 'short';
            break;
        case Duration.SET:
            ytDuration = 'medium';
            break;
        case Duration.FULLCONCERT:
            ytDuration = 'long';
            break;
    }

    var searchString = yt_search + ytDuration + '&q=' + encodeURIComponent('live ' + artist);

    return this.http.get(searchString).map((res: any) => {
      var ytResults: {items: YTSearchResult[] } = res.json();
      var transformedResults = ytResults.items.map(this.toConcertSummary)
      this.concerts = transformedResults;
      return transformedResults;
    });
  }

  public getConcert(id: String): ConcertSummary {
      return this.concerts.filter(c => c.id === id)[0];
  }

  private toConcertSummary(result: YTSearchResult): ConcertSummary {
      var desc = result.snippet.description || "No description available";
      return new ConcertSummary(result.id.videoId, result.snippet.thumbnails.medium.url,
          result.snippet.title, desc);
  }
}
