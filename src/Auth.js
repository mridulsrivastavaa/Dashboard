import axios from 'axios';
import { generateRandomString, sha256 } from './utils';

// Spotify API credentials
const clientId = '23e6babc4407439d850aa6f0e2b03ac9';
const redirectUri = 'https://oauth.pstmn.io/v1/browser-callback';
const scope = 'playlist-modify-public playlist-read-private playlist-modify-private'; // Define the required scopes

// PKCE Variables
let codeVerifier;

// Generate code verifier and challenge
export const generateCodeChallenge = async () => {
  codeVerifier = generateRandomString(64);
  const codeChallenge = await sha256(codeVerifier);

  localStorage.setItem('code_verifier', codeVerifier); // Save codeVerifier in local storage

  return codeChallenge;
};

// Redirect user to Spotify authorization
export const redirectToSpotifyAuth = async () => {
  const codeChallenge = await generateCodeChallenge();
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
    scope
  )}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

  window.location.href = authUrl;
};

// Exchange authorization code for access token
export const exchangeCodeForToken = async (authCode) => {
  const storedCodeVerifier = localStorage.getItem('code_verifier');

  const data = new URLSearchParams();
  data.append('client_id', clientId);
  data.append('grant_type', 'authorization_code');
  data.append('code', authCode);
  data.append('redirect_uri', redirectUri);
  data.append('code_verifier', storedCodeVerifier);

  const response = await axios.post('https://accounts.spotify.com/api/token', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data;
};

// Get access token from localStorage
export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};
