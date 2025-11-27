import React from 'react';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {useFile, useMedia} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import { useNavigate } from 'react-router';

const Upload = () => {
  const [file, setFile] = useState(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const navigate = useNavigate();
  const initValues = {
    title: '',
    description: '',
  };



  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');;
      const fileData = await postFile(file, token);
      await postMedia( fileData, inputs, token);
      navigate('/')
      // TODO: call postFile function (see below)
      // TODO: call postMedia function (see below)
      // TODO: redirect to Home
    } catch (e) {
      console.log(e.message);
    }
  };

    const {inputs, handleInputChange, handleSubmit} = useForm(
    doUpload,
    initValues,
  );

return (
  <>
    <h1 className="mb-6 text-3xl font-semibold text-center">Upload</h1>
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-4"
    >
      <div className="flex flex-col w-4/5">
        <label htmlFor="title" className="mb-1 font-medium">
          Title
        </label>
        <input
          name="title"
          type="text"
          id="title"
          onChange={handleInputChange}
          className="mb-2 rounded border border-neutral-400 px-3 py-2 bg-neutral-900 text-neutral-100"
        />
      </div>

      <div className="flex flex-col w-4/5">
        <label htmlFor="description" className="mb-1 font-medium">
          Description
        </label>
        <textarea
          name="description"
          rows={5}
          id="description"
          onChange={handleInputChange}
          className="mb-2 rounded border border-neutral-400 px-3 py-2 bg-neutral-900 text-neutral-100"
        ></textarea>
      </div>

      <div className="flex flex-col w-4/5">
        <label htmlFor="file" className="mb-1 font-medium">
          File
        </label>
        <input
          name="file"
          type="file"
          id="file"
          accept="image/*, video/*"
          onChange={handleFileChange}
          className="mb-2 rounded border border-neutral-400 px-3 py-2 bg-neutral-900 text-neutral-100"
        />
      </div>

      <img
        src={
          file
            ? URL.createObjectURL(file)
            : 'https://via.placeholder.com/200?text=Choose+image'
        }
        alt="preview"
        width="200"
        className="my-2 h-[200px] w-[200px] rounded object-cover"
      />

      <button
        type="submit"
        disabled={!(file && inputs.title.length > 3)}
        className="mt-2 rounded bg-[#363636] px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-neutral-700"
      >
        Upload
      </button>
    </form>
  </>
);

};

Upload.propTypes = {};

export default Upload;
