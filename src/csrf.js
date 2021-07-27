const API_HOST = 'http://server.domain.net';

let _csrfToken = null;

export async function getCsrfToken() {
  if (_csrfToken === null) {
    const response = await fetch(`${API_HOST}/csrf/`, {
      credentials: 'include',
    });
    const data = await response.json();
    _csrfToken = data.csrfToken;
  }
  return _csrfToken;
}
// export default getCsrfToken;

// import getSomething from './csrf'
