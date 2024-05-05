export const extractToken = (headers: Headers) => {
  const authorizationHeader: string = headers['authorization'] || '';
  return authorizationHeader && authorizationHeader.startsWith('Bearer ')
    ? authorizationHeader.substring(7)
    : '';
};
