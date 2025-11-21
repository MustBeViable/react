import React from 'react';

export const SingleView = ({
  selectedItem,
  setSelectedItem,
  isOpen,
  setIsOpen,
}) => {

  if (!selectedItem) return null;

  const isImage = selectedItem.media_type?.startsWith('image');
  const isVideo = selectedItem.media_type?.startsWith('video');

  console.log("image:", isImage);
  console.log("video:", isVideo)
  return (
    <>
      {selectedItem && (
        <dialog open={isOpen}>
          <h3>{selectedItem?.title ?? ''}</h3>
          <p>{selectedItem?.description ?? ''}</p>
          {selectedItem.media_type.startsWith('image') && (
            <img src={selectedItem.filename ?? ''} alt="picture of media" />
          )}
          {selectedItem.media_type.startsWith('video') && (
            <iframe
              width="560"
              height="315"
              src={selectedItem.filename}
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
