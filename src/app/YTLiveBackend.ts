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

export class ConcertService {

  private concerts: ConcertSummary[];

  public findConcerts(artist: string, duration = Duration.FULLCONCERT): ConcertSummary[] {
    return [new ConcertSummary("1", "na", "title here", "desc")]
  }

  public concertIdToEmbedUrl(id: string): string {
    return yt_embed + id + '?showinfo=0&autoplay=1';
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

export enum Duration { SONG, SET, FULLCONCERT }
