import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SpotifyWrapper from '../src/index';

global.fetch = require('node-fetch');

chai.use(sinonChai);

describe('SpotifyWrapper Libary', () => {
  it('Should create an instace of SpotfyWrapper', () => {
    const spotify = new SpotifyWrapper({});

    expect(spotify).to.be.an.instanceof(SpotifyWrapper);
  });

  it('should recive apiURL as an option', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'foo',
    });

    expect(spotify.apiURL).to.be.equal('foo');
  });

  it('should use the default apiURl if not provided', () => {
    const spotify = new SpotifyWrapper({});

    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should recive Token as an option ', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo',
    });

    expect(spotify.token).to.be.equal('foo');
  });
});

describe('request method', () => {
  let stubedFetch;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    stubedFetch.resolves({ json: () => ({ album: 'name' }) });
  });


  afterEach(() => {
    stubedFetch.restore();
  });

  it('should have request method', () => {
    const spotify = new SpotifyWrapper({});

    expect(spotify.request).to.exist;
  });

  it('should call fetch when request', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo',
    });

    spotify.request('url');

    expect(stubedFetch).to.have.been.calledOnce;
  });

  it('should call fetch with right url passed', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo',
    });

    spotify.request('url');

    expect(stubedFetch).to.have.been.calledWith('url');
  });

  it('should call fetch with right headers passed', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo',
    });

    const headers = {
      headers: {
        Authorization: 'Bearer foo',
      },
    };


    spotify.request('url');

    expect(stubedFetch).to.have.been.calledWith('url', headers);
  });
});
