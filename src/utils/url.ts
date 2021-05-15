/**
 * Parse OAuth return url to retrieve parameters
 *
 * @param {string} url - http url on OAuth return URL format
 * @return {string} A good string
 *
 */
// eslint-disable-next-line import/prefer-default-export
export const getParametersFromURL = (url: string): Record<string, string> => {
  // In url, the base URL is on the left of "#" and parameters on the right
  const params = url.split('#');

  if (params[1] == null) {
    return {};
  }

  // Return params as an object with param title as key
  return params[1].split('&').reduce((prev: any, curr: string) => {
    const [title, value] = curr.split('=');
    return { ...prev, [title]: value };
  }, {});
};
