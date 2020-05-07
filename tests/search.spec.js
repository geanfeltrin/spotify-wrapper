/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';


import {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists,
} from '../src/search';

global.fetch = require('node-fetch');

chai.use(sinonChai);

describe('Search', () => {
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

  describe('Genaric Search', () => {
    let fetchedStub;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      fetchedStub.resolves({ json: () => ({ album: 'name' }) });
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call fetch function', () => {
      const artists = search();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const albums = search('Incubus', 'album');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });

    it('should return JSON data from the Promise', () => {
      const artists = search('Incubus', 'artist');

      artists.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });
});
