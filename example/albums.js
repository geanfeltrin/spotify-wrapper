import SpotifyWrapper from '../src/index';


global.fetch = require('node-fetch');


const spotify = new SpotifyWrapper({
  token: 'BQBE1KMN-uA04-bYmd8_Cu8LbZcC_IU-b4GJse7QWXAKhDGROcLldUJYHbnVUxtzPTz5XmoKKC0Vs3qil3pz4kL-daEEE3YrFtFitlJAwpVtmYUg1DrylD--3CmtmdQee9Wd12hmVDqNw2AWOtVYtEYj_xxMcz8',
});

const albums = spotify.search.albums('Incubus');

albums.then((data) => data.albums.items.map((item) => console.log(item.name)));
