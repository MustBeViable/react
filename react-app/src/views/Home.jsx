import MediaRow from '../components/MediaRow';
import {useState} from 'react';
import {useMedia} from '../hooks/apiHooks';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const {mediaArray, deleteMedia, modifyMedia} = useMedia();
  const navigate = useNavigate(); 

  const handleEditMedia = async (item) => {
    const newTitle = window.prompt('New title', item.title);
    if (newTitle === null) return;

    const newDescription = window.prompt(
      'New description',
      item.description ?? '',
    );
    if (newDescription === null) return;

    try {
      const token = localStorage.getItem('token');
      await modifyMedia(
        item.media_id,
        {
          title: newTitle,
          description: newDescription,
        },
        token,
      );
      navigate('/')
    } catch (error) {
      console.error(error);
      alert('Failed to update media');
    }
  };

  const handleDeleteMedia = async (item) => {
    const ok = window.confirm(`Delete "${item.title}"?`);
    if (!ok) return;

    try {
      const token = localStorage.getItem('token');
      await deleteMedia(item.media_id, token);
    } catch (error) {
      console.error(error);
      alert('Failed to delete media');
    }
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">My Media</h2>

      <table className="w-full border-collapse text-sm">
        <thead className="bg-neutral-800 text-neutral-100">
          <tr>
            <th className="p-4 border border-neutral-700">Thumbnail</th>
            <th className="p-4 border border-neutral-700">Title</th>
            <th className="p-4 border border-neutral-700">Owner</th>
            <th className="p-4 border border-neutral-700">Description</th>
            <th className="p-4 border border-neutral-700">Created</th>
            <th className="p-4 border border-neutral-700">Size</th>
            <th className="p-4 border border-neutral-700">Type</th>
            <th className="p-4 border border-neutral-700">Actions</th>
          </tr>
        </thead>

        <tbody
          className="
            [&>tr:nth-child(odd)]:bg-neutral-900
            [&>tr:nth-child(even)]:bg-neutral-800

            [&>tr>td]:p-4
            [&>tr>td]:border
            [&>tr>td]:border-neutral-700
            [&>tr>td]:align-middle
            [&>tr>td]:text-center

            [&>tr>td:first-child>img]:w-[260px]
            [&>tr>td:first-child>img]:h-[200px]
            [&>tr>td:first-child>img]:object-cover
          "
        >
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onEditClick={handleEditMedia}
              onDeleteClick={handleDeleteMedia}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
