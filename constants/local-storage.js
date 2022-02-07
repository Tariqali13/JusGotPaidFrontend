export const getLocalStorageValues = () => {
  const isWindow = typeof window !== 'undefined';
  const user_id = isWindow ? localStorage.getItem('user_id') : '';
  const user_email = isWindow ? localStorage.getItem('user_email') : '';
  const user_phone_number = isWindow
    ? localStorage.getItem('user_phone_number')
    : '';
  const user_is_verified = isWindow
    ? localStorage.getItem('user_is_verified')
    : '';
  const user_auth_token = isWindow
    ? localStorage.getItem('user_auth_token')
    : '';
  const user_role = isWindow ? localStorage.getItem('user_role') : '';
  const event_id = isWindow ? localStorage.getItem('event_id') : '';
  const influencer_id = isWindow ? localStorage.getItem('influencer_id') : '';
  const profile_link = isWindow ? localStorage.getItem('profile_link') : '';
  return {
    user_id,
    user_email,
    user_phone_number,
    user_is_verified,
    user_auth_token,
    user_role,
    event_id,
    influencer_id,
    profile_link
  };
};
