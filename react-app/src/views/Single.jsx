import React from 'react';
import PropTypes from 'prop-types';
import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const selectedItem = state;
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h3>{selectedItem?.title ?? ''}</h3>
        <p>{selectedItem?.description ?? ''}</p>
        {selectedItem?.media_type === 'image/jpeg' && (
          <img src={selectedItem?.filename ?? ''} alt="picture of media" />
        )}
        {selectedItem?.media_type === 'video/mp4' && (
          <iframe
            width="560"
            height="315"
            src={selectedItem.filename}
            title="YouTube video player"
            autoPlay
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    </>
  );
};

Single.propTypes = {};

export default Single;
