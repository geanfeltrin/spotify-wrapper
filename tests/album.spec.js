// getAlbum
// getAlbumTracks

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

chai.use(sinonChai);

describe('Album', () => {
  let spotify;
  let stubedFetch;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
    stubedFetch = sinon.stub(global, 'fetch');
    stubedFetch.resolves({ json: () => ({ album: 'name' }) });
  });


  afterEach(() => {
    stubedFetch.restore();
  });

  describe('smoke tests', () => {
    it('should exist getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist.a('function');
    });

    it('should exist getAlbumTracks method', () => {
      expect(spotify.album.getTracks).to.exist.a('function');
    });
  });

  describe('getAlbum', () => {
    // verifica se o fetch ocorre
    it('should call fetch method', () => {
      const album = spotify.album.getAlbum();

      expect(stubedFetch).to.have.been.calledOnce;
    });
    // verifica se o fetch ocorre com a url desejada
    it('should call fetch with the correct url ', () => {
      const album = spotify.album.getAlbum('41MnTivkwTO3UUJ8DrqEJJ');

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/41MnTivkwTO3UUJ8DrqEJJ');

      const album2 = spotify.album.getAlbum('41MnTivkwTO3UUJ8DrqEJk');

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/41MnTivkwTO3UUJ8DrqEJk');
    });

    // verifica se  o dado é recebido pela Promise

    it('should return the correct data from promise', () => {
      const album = spotify.album.getAlbum('41MnTivkwTO3UUJ8DrqEJJ');

      album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });

  describe('getAlbums', () => {
    // verifica se o fetch ocorre
    it('should call fetch method', () => {
      const albums = spotify.album.getAlbums();

      expect(stubedFetch).to.have.been.calledOnce;
    });
    // verifica se o fetch ocorre com a url desejada
    it('should call fetch with the correct url ', () => {
      const albums = spotify.album.getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '41MnTivkwTO3UUJ8DrqEJk']);

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=41MnTivkwTO3UUJ8DrqEJJ,41MnTivkwTO3UUJ8DrqEJk');

      const albums2 = spotify.album.getAlbums(['41MnTivkwTO3UUJ8DrqEJk', '41MnTivkwTO3UUJ8DrqEJT']);

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=41MnTivkwTO3UUJ8DrqEJk,41MnTivkwTO3UUJ8DrqEJT');
    });

    // verifica se  o dado é recebido pela Promise

    it('should return the correct data from promise', () => {
      const albums = spotify.album.getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '41MnTivkwTO3UUJ8DrqEJk']);

      albums.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });


  describe('getTracks', () => {
    it('should call fetch method', () => {
      const tracks = spotify.album.getTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    it('should return the correct data from Promise', () => {
      const tracks = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy');
      tracks.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });
});
