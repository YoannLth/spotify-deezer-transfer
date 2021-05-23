import moxios from 'moxios';
import SpotifyEngine from './SpotifyEngine';

describe('SpotifyEngine', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should init class with correct values', () => {
      const token = '123';
      const engine = new SpotifyEngine(token);
      expect(engine.token).toBe(token);
    });
  });

  describe('fetchUserData', () => {
    const token = '123';
    let engine: SpotifyEngine;

    beforeEach(() => {
      engine = new SpotifyEngine(token);
      moxios.install(engine.httpClient);
    });

    afterEach(() => {
      moxios.uninstall(engine.httpClient);
    });

    it('should throw error if WS call fails', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({});
      });
      await expect(() => engine.fetchUserData()).rejects.toBeDefined();
    });

    it('should throw error if response contains error', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            error: { message: 'This is an error' },
          },
        });
      });
      await expect(() => engine.fetchUserData()).rejects.toBeDefined();
    });

    it('should not throw error if WS call succeed', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: {} });
      });

      await expect(engine.fetchUserData()).resolves.toBeDefined();
    });

    it('should set throw userId if WS call succeed', async () => {
      const id = '0123';
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            id,
          },
        });
      });

      await engine.fetchUserData();
      expect(engine.userId).toBe(id);
    });
  });

  describe('verifyConnection', () => {
    const token = '123';
    let engine: SpotifyEngine;

    beforeEach(() => {
      engine = new SpotifyEngine(token);
      moxios.install(engine.httpClient);
    });

    afterEach(() => {
      moxios.uninstall(engine.httpClient);
    });

    it('should return false if WS call fails', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({});
      });

      const result = await engine.verifyConnection();
      expect(result).toBe(false);
    });

    it('should return true if WS call succeed', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: {} });
      });

      const result = await engine.verifyConnection();
      expect(result).toBe(true);
    });
  });
});
