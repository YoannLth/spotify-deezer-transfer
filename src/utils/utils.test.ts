import { getParametersFromURL } from './url';
import { logError } from './logger';

describe('getParametersFromURL', () => {
  test('Invalid URLs returns {}', () => {
    expect(getParametersFromURL('')).toStrictEqual({});
    expect(getParametersFromURL('hello world')).toStrictEqual({});
    expect(getParametersFromURL('http://localhost:3000')).toStrictEqual({});
  });

  test('Valid URL return params', () => {
    expect(
      getParametersFromURL('https://example-app.com/redirect#access_token=123')
    ).toStrictEqual({ access_token: '123' });

    expect(
      getParametersFromURL(
        'https://example-app.com/redirect#access_token=123&token_type=bearer&expires_in=3600'
      )
    ).toStrictEqual({
      access_token: '123',
      token_type: 'bearer',
      expires_in: '3600',
    });
  });
});

describe('logError', () => {
  const OLD_ENV_VALUE = process.env.NODE_ENV;
  const spy = jest.spyOn(console, 'warn').mockImplementation();

  afterAll(() => {
    spy.mockRestore();
  });

  afterEach(() => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: OLD_ENV_VALUE,
      configurable: true,
      writable: true,
    });
  });

  test('should call console.warn in dev', () => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      configurable: true,
      writable: true,
    });

    logError(Error('test'));
    expect(spy).toHaveBeenCalledTimes(1);

    logError(Error('test'));
    logError(Error('test'));
    expect(spy).toHaveBeenCalledTimes(3);
  });

  test('should not call console.warn in other env than dev', () => {
    logError(Error('test'));
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
