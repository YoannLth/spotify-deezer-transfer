import apiConstants from '../constants/api';

// TODO: remove this file

// eslint-disable-next-line import/prefer-default-export
export const fetchSpotifyUserData = (token: string): Promise<any> =>
  new Promise((res, rej) => {
    fetch(`${apiConstants.SPOTIFY_API_BASE_URL}/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          response
            .json()
            .then((data) => {
              res(data);
            })
            .catch((e) => {
              rej(e);
            });
        } else {
          rej(Error(`Error calling fetch: ${response.status}`));
        }
      })
      .catch((e) => {
        rej(e);
      });
  });

  export const fetchDeezerUserData = (token: string): Promise<any> =>
  new Promise((res, rej) => {
    fetch(`${apiConstants.DEEZER_API_BASE_URL}/user/me?access_token=${token}`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          response
            .json()
            .then((data) => {
              res(data);
            })
            .catch((e) => {
              rej(e);
            });
        } else {
          rej(Error(`Error calling fetch: ${response.status}`));
        }
      })
      .catch((e) => {
        rej(e);
      });
  });
