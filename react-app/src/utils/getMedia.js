import {fetchData} from './fetchdata';
const getMedia = async () => {
  try {
    const mediaUrl = import.meta.env.VITE_MEDIA_API + '/media';
    const authUrl = import.meta.env.VITE_AUTH_API + '/users/';
    const json = await fetchData(mediaUrl);
    const mediaWithUsers = await Promise.all(
      json.map(async (item) => {
        const user = await fetchData(authUrl + item.user_id);
        return {
          ...item,
          username: user.username,
        };
      }),
    );
    console.log(mediaWithUsers);
    return mediaWithUsers;
  } catch (error) {
    console.log(error);
  }
};

export {getMedia};
