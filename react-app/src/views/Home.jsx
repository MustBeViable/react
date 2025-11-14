import MediaRow from '../components/MediaRow';
import '../App.css';
import {useEffect, useState} from 'react';
import {fetchData} from '../fetchdata.js';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
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
        setMediaArray(mediaWithUsers);
        console.log(mediaWithUsers);
      } catch (error) {
        console.log(error);
      }
    };

    getMedia();
  }, []);

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
