// getAlbum
// getAlbumTracks

import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/index';

global.fetch = require('node-fetch');

chai.use(sinonChai);

describe('Album', () => {
  let stubedFetch;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    stubedFetch.resolves({ json: () => ({ album: 'name' }) });
  });


  afterEach(() => {
    stubedFetch.restore();
  });

  describe('smoke tests', () => {
    it('should exist getAlbum method', () => {
      expect(getAlbum).to.exist.a('function');
    });

    it('should exist getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist.a('function');
    });
  });

  describe('getAlbum', () => {
    // verifica se o fetch ocorre
    it('should call fetch method', () => {
      const album = getAlbum();

      expect(stubedFetch).to.have.been.calledOnce;
    });
    // verifica se o fetch ocorre com a url desejada
    it('should call fetch with the correct url ', () => {
      const album = getAlbum('41MnTivkwTO3UUJ8DrqEJJ');

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/41MnTivkwTO3UUJ8DrqEJJ');

      const album2 = getAlbum('41MnTivkwTO3UUJ8DrqEJk');

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/41MnTivkwTO3UUJ8DrqEJk');
    });

    // verifica se  o dado é recebido pela Promise

    it('should return the correct data from promise', () => {
      const album = getAlbum('41MnTivkwTO3UUJ8DrqEJJ');

      album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });

  describe('getAlbums', () => {
    // verifica se o fetch ocorre
    it('should call fetch method', () => {
      const albums = getAlbums();

      expect(stubedFetch).to.have.been.calledOnce;
    });
    // verifica se o fetch ocorre com a url desejada
    it('should call fetch with the correct url ', () => {
      const albums = getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '41MnTivkwTO3UUJ8DrqEJk']);

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=41MnTivkwTO3UUJ8DrqEJJ,41MnTivkwTO3UUJ8DrqEJk');

      const albums2 = getAlbums(['41MnTivkwTO3UUJ8DrqEJk', '41MnTivkwTO3UUJ8DrqEJT']);

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=41MnTivkwTO3UUJ8DrqEJk,41MnTivkwTO3UUJ8DrqEJT');
    });

    // verifica se  o dado é recebido pela Promise

    it('should return the correct data from promise', () => {
      const albums = getAlbums(['41MnTivkwTO3UUJ8DrqEJJ', '41MnTivkwTO3UUJ8DrqEJk']);

      albums.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });
});
