import {fetchData} from '../utils/fetchdata';
import {useState, useEffect} from 'react';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

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

  useEffect(() => {
    const updateMedia = async () => {
      setMediaArray(await getMedia());
    };
    updateMedia();
  }, []);

  return {mediaArray};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const loginResult = await fetchData(
        import.meta.env.VITE_AUTH_API + '/auth/login',
        fetchOptions,
      );

      localStorage.setItem('token', loginResult.token);

      return loginResult;
    } catch (error) {
      console.log(error);
    }
  };

  return {postLogin};
};

const useUser = () => {
  const [user, setUser] = useState(null);
  const getUserByToken = async () => {
    const token = localStorage.getItem('token');
    const fetchOptions = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`, Accept: 'application/json'},
    };
    try {
      const userInfo = await fetchData(
        import.meta.env.VITE_AUTH_API + '/users/token',
        fetchOptions,
      );
      return userInfo.user;
    } catch (error) {
      console.log(error);
    }
  };

  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    try {
      const result = await fetchData(
        import.meta.env.VITE_AUTH_API + '/users',
        fetchOptions,
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const updateUser = async () => {
      setUser(await getUserByToken());
    };
    updateUser();
  }, []);

  return {user, postUser};
};

export {useMedia, useAuthentication, useUser};
