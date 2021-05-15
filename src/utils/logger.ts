// eslint-disable-next-line import/prefer-default-export
export const logError = (e: Error) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
};
