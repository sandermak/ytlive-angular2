import { ConcertSummary } from '../YTLiveBackend';

export interface PlaylistService {
    getPlaylist(): ConcertSummary[];
    addConcert(concert: ConcertSummary): void;
    removeConcert(id: string): void;
}

export class LocalStoragePlayList implements PlaylistService {

    private static PLAYLIST_KEY = 'ytlive-playlist';

    addConcert(concert: ConcertSummary): void {
        var playlist = this.getPlaylistInternal();
        if(!playlist.some(c => c.id === concert.id)) {
            playlist.unshift(concert);
        }
        localStorage.setItem(LocalStoragePlayList.PLAYLIST_KEY, JSON.stringify(playlist));
    }

    removeConcert(id: string): void {
        var playlist = this.getPlaylistInternal();
        playlist = playlist.filter(c => c.id !== id);
        localStorage.setItem(LocalStoragePlayList.PLAYLIST_KEY, JSON.stringify(playlist));
    }

    getPlaylist(): ConcertSummary[] {
        return this.getPlaylistInternal();
    }

    private getPlaylistInternal(): ConcertSummary[] {
        var playlistString = localStorage.getItem(LocalStoragePlayList.PLAYLIST_KEY);
        var playlist: ConcertSummary[] =  playlistString ? JSON.parse(playlistString) : [];

        if(!playlistString) {
            localStorage.setItem(LocalStoragePlayList.PLAYLIST_KEY, JSON.stringify(playlist));
        }
        return playlist;
    }
}
