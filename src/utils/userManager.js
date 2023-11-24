import { createUserManager  } from 'redux-oidc';

const userManagerConfig = {
  client_id: 'inveon',
  redirect_uri: `http://localhost:3000/callback`,
  response_type: 'code',
  client_secret: "secret",
  scope: 'openid profile',
  authority: 'http://localhost:5002',
  silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
  automaticSilentRenew: true,
  loadUserInfo: true
};

const userManager = createUserManager(userManagerConfig);
export default userManager;