const http = require('http');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const hostname = '127.0.0.1';
const port = process.env.SPOTIFY_MOCK_SERVER_PORT;

const server = http.createServer((req, res) => {
  const redirectURL =
    `${process.env.REACT_APP_SPOTIFY_REDIRECT_URL}#access_token=v7IBQ-SIM_QdLFKOWXK3yUwcVreA&token_type=Bearer&expires_in=3600`;
  res.writeHead(301, { Location: redirectURL });
  res.end();
});

server.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://${hostname}:${port}/`);
});

exports.default = server;
