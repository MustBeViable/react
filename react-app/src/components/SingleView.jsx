import React from 'react';

export const SingleView = ({
  selectedItem,
  setSelectedItem,
  isOpen,
  setIsOpen,
}) => {
  return (
    <>
      {selectedItem && (
        <dialog open={isOpen}>
          <h3>{selectedItem?.title ?? ''}</h3>
          <p>{selectedItem?.description ?? ''}</p>
          {selectedItem.media_type === 'image/jpeg' && (
            <img src={selectedItem?.filename ?? ''} alt="picture of media" />
          )}
          {selectedItem.media_type === 'video/mp4' && (
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
          <button
            onClick={() => {
              setSelectedItem(null);
              setIsOpen(false);
            }}
          >
            Close
          </button>
        </dialog>
      )}
    </>
  );
};
