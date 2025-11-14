import React from 'react';
import PropTypes from 'prop-types';
import {useLocation, useNavigate} from 'react-router-dom';

const Single = () => {
  const {state} = useLocation();
  const selectedItem = state;
  console.log(state);
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h3>{selectedItem?.title ?? ''}</h3>
        <p>{selectedItem?.description ?? ''}</p>
        {selectedItem?.media_type === 'image/jpeg' && (
          <img src={selectedItem?.filename ?? ''} alt="picture of media" />
        )}
        {(selectedItem?.media_type === 'video/quicktime' ||
          selectedItem?.media_type === 'video/mp4') && (
          <video width="560" height="315" controls autoPlay muted>
            <source
              src={selectedItem.filename}
              type={selectedItem.media_type}
            />
          </video>
        )}
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    </>
  );
};

Single.propTypes = {};

export default Single;
