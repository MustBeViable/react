import MediaRow from '../components/MediaRow';
import '../App.css';
import { useState } from 'react';
import { useMedia } from '../hooks/apiHooks';

const Home = () => {

  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


  const { mediaArray } = useMedia();

  return (
    <>
      <h2>My Media</h2>
      <table className="pizza-card">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Owner</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => {
            return (
              <MediaRow
                key={item.media_id}
                item={item}
                className="pizza-card"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default Home;
