/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';


import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

chai.use(sinonChai);

describe('Search', () => {
  let spotify;
  let fetchedStub;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke-teste', () => {
    it('should exist the spotify.search.albums method', () => {
      expect(spotify.search.albums).to.be.a('function');
    });
    it('should exist the spotify.search.artists method', () => {
      expect(spotify.search.artists).to.be.a('function');
    });
    it('should exist the spotify.search.tracks method', () => {
      expect(spotify.search.tracks).to.be.a('function');
    });
    it('should exist the spotify.search.playlists method', () => {
      expect(spotify.search.playlists).to.be.a('function');
    });
  });


  describe('spotify.search.albums', () => {
    it('should call fetch function', () => {
      const albums = spotify.search.albums();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const albums = spotify.search.albums('Incubus');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

        const albums2 = spotify.search.albums('Muse');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
      });
    });
  });

  describe('spotify.search.artists', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.artists();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = spotify.search.artists('Incubus');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artists');

        const artists2 = spotify.search.artists('Muse');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artists');
      });
    });
  });

  describe('spotify.search.tracks', () => {
    it('should call fetch function', () => {
      const track = spotify.search.tracks();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const track = spotify.search.tracks('Incubus');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');

        const track2 = spotify.search.tracks('Muse');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
      });
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      const playlists = spotify.search.playlists();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const playlists = spotify.search.playlists('Incubus');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

        const playlists2 = spotify.search.playlists('Muse');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
      });
    });
  });
});
