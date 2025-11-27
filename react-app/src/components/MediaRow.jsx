import { Link } from 'react-router-dom';
import { useUserContext } from '../hooks/contextHooks';

const MediaRow = ({ item, setSelectedItem, onEditClick, onDeleteClick }) => {
  const { user } = useUserContext();

  const isOwner = user && user.user_id === item.user_id;
  const isAdmin = user && user.level_name === 'Admin';
  const canEditOrDelete = user && (isOwner || isAdmin);

  const handleViewClick = () => {
    setSelectedItem(item);
  };

  const handleEditClick = () => {
    if (onEditClick) {
      onEditClick(item);
    }
  };

  const handleDeleteClick = () => {
    if (onDeleteClick) {
      onDeleteClick(item);
    }
  };

  return (
    <tr className="pizza-card">
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.username}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <Link
          to="/single"
          state={item}
          onClick={handleViewClick}
          className="inline-block px-2 py-1 bg-[#363636] text-white no-underline hover:bg-[#111111]"
        >
          Show
        </Link>

        {canEditOrDelete && (
          <>
            <button
              type="button"
              onClick={handleEditClick}
              className="inline-block ml-2 px-2 py-1 bg-[#363636] text-white hover:bg-[#111111]"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              className="inline-block ml-2 px-2 py-1 bg-[#363636] text-white hover:bg-[#111111]"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default MediaRow;
