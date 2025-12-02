import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Likes from '../components/Likes';

const Single = () => {
  const {state} = useLocation();
  const selectedItem = state;
  const navigate = useNavigate();

  if (!selectedItem) {
    return (
      <div className="p-4">
        <p>No media selected.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 rounded bg-neutral-800 px-4 py-2 text-neutral-100 hover:bg-neutral-700"
        >
          Go back
        </button>
      </div>
    );
  }

  const isImage = selectedItem.media_type?.startsWith('image');
  const isVideo = selectedItem.media_type?.startsWith('video');
  const isYouTube =
    isVideo &&
    (selectedItem.filename?.includes('youtube.com') ||
      selectedItem.filename?.includes('youtu.be'));

  return (
    <div className="p-4">
      <h3 className="mb-2 text-2xl font-semibold">{selectedItem?.title ?? ''}</h3>
      <p className="mb-4 text-sm text-neutral-300">
        {selectedItem?.description ?? ''}
      </p>

      {isImage && (
        <img
          src={selectedItem?.filename ?? ''}
          alt="picture of media"
          className="mb-4 max-h-[500px] w-full object-contain"
        />
      )}

      {isVideo && isYouTube && (
        <iframe
          className="mb-4 h-[360px] w-full max-w-[640px]"
          src={selectedItem.filename}
          title={selectedItem.title ?? 'video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}

      {isVideo && !isYouTube && (
        <video
          className="mb-4 max-h-[500px] w-full object-contain"
          controls
        >
          <source src={selectedItem.filename} />
          Your browser does not support the video tag.
        </video>
      )}

      <Likes mediaId={selectedItem.media_id} />

      <button
        onClick={() => navigate(-1)}
        className="mt-6 rounded bg-neutral-800 px-4 py-2 text-neutral-100 hover:bg-neutral-700"
      >
        Go back
      </button>
    </div>
  );
};

export default Single;
