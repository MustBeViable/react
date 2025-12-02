import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useUserContext} from '../hooks/contextHooks';
import {useLikes} from '../hooks/apiHooks';


const Likes = ({mediaId}) => {
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(null);

  const {getLikesByMediaId, getUserLikeByMediaId, postLike, deleteLike} =
    useLikes();
  const {user} = useUserContext();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likeList = await getLikesByMediaId(mediaId);
        setLikes(Array.isArray(likeList) ? likeList : []);
      } catch (error) {
        console.error('Error fetching likes', error);
        setLikes([]);
      }

      if (user) {
        const myLike = await getUserLikeByMediaId(mediaId);
        setUserLike(myLike);
      } else {
        setUserLike(null);
      }
    };

    fetchLikes();

  }, [mediaId, user]);

  const handleLikeToggle = async () => {
    if (!user) return;

    try {
      if (userLike) {
        await deleteLike(userLike.like_id);
      } else {
        await postLike(mediaId);
      }

      const [updatedLikes, updatedUserLike] = await Promise.all([
        getLikesByMediaId(mediaId),
        getUserLikeByMediaId(mediaId),
      ]);

      setLikes(Array.isArray(updatedLikes) ? updatedLikes : []);
      setUserLike(updatedUserLike);
    } catch (error) {
      console.error('Error toggling like', error);
    }
  };

  const isLiked = Boolean(userLike);
  const likeCount = likes.length;

  return (
    <div className="mt-4 flex items-center gap-4">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleLikeToggle();
        }}
        disabled={!user}
        className={`
          rounded px-3 py-1 text-sm font-medium
          ${isLiked ? 'bg-red-600 hover:bg-red-700' : 'bg-neutral-700 hover:bg-neutral-900'}
          text-white disabled:cursor-not-allowed disabled:opacity-50
        `}
      >
        {isLiked ? 'Unlike' : 'Like'}
      </button>
      <span className="text-sm text-neutral-200">
        {likeCount} {likeCount === 1 ? 'like' : 'likes'}
      </span>
    </div>
  );
};

export default Likes;