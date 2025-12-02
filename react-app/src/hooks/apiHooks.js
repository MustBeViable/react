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

  const postMedia = async (file, inputs, token) => {
    const body = {
      title: inputs.title,
      description: inputs.description,
      filename: file.filename,
      media_type: file.media_type,
      filesize: file.filesize,
    };
    const mediaObject = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    try {
      const mediaUrl = import.meta.env.VITE_MEDIA_API + `/media`;
      const newMedia = await fetchData(mediaUrl, mediaObject);
      return {newMedia};
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMedia = async (mediaId, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const mediaUrl = import.meta.env.VITE_MEDIA_API + `/media/${mediaId}`;
      const result = await fetchData(mediaUrl, fetchOptions);

      setMediaArray((prev) => prev.filter((item) => item.media_id !== mediaId));

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const modifyMedia = async (mediaId, inputs, token) => {
    const body = {
      title: inputs.title,
      description: inputs.description,
    };

    const fetchOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    try {
      const mediaUrl = import.meta.env.VITE_MEDIA_API + `/media/${mediaId}`;
      const result = await fetchData(mediaUrl, fetchOptions);

      setMediaArray((prev) =>
        prev.map((item) =>
          item.media_id === mediaId
            ? {...item, title: body.title, description: body.description}
            : item,
        ),
      );

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {mediaArray, getMedia, postMedia, deleteMedia, modifyMedia};
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
      return false;
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

  return {user, postUser, getUserByToken};
};
const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    const fileObject = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'multipart/form-data',
      },
      body: formData,
    };
    const imageUploadUrl = import.meta.env.VITE_UPLOAD_SERVER + `/upload`;
    try {
      const fileUpload = await fetchData(imageUploadUrl, fileObject);
      return fileUpload.data;
    } catch (error) {
      console.log(error);
    }
  };
  return {postFile};
};

const useLikes = () => {
  const mediaUrl = import.meta.env.VITE_MEDIA_API;

  const getUserLikeByMediaId = async (mediaId) => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      return await fetchData(
        `${mediaUrl}/likes/bymedia/user/${mediaId}`,
        options,
      );
    } catch (error) {
      // 404 tms. = käyttäjä ei ole tykännyt
      if (
        error.message?.toLowerCase().includes('like not found') ||
        error.message?.toLowerCase().includes('no likes found')
      ) {
        return null;
      }
      throw error;
    }
  };

  const postLike = async (mediaId) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No auth token found');

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({media_id: mediaId}),
    };

    const url = mediaUrl + '/likes';
    const result = await fetchData(url, fetchOptions);
    return result; // { message: "Like added" }
  };

  const deleteLike = async (likeId) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No auth token found');

    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = mediaUrl + `/likes/${likeId}`;
    const result = await fetchData(url, fetchOptions);
    return result; // { message: "Like deleted" }
  };

  const getLikesByMediaId = async (mediaId) => {
    try {
      const url = mediaUrl + `/likes/bymedia/${mediaId}`;
      const likes = await fetchData(url);
      return likes;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return {postLike, deleteLike, getLikesByMediaId, getUserLikeByMediaId};
};


export {useMedia, useAuthentication, useUser, useFile, useLikes};
