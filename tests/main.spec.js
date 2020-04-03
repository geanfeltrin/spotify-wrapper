import { expect } from 'chai';
import {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists,
} from '../src/main';

describe('Spotify Wrapper', () => {
  describe('smoke-teste', () => {
    it('should exist the search method', () => {
      expect(search).to.be.a('function');
    });
    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.be.a('function');
    });
    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.be.a('function');
    });
    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.be.a('function');
    });
    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.be.a('function');
    });
  });
});
