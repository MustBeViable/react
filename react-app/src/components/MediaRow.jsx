const MediaRow = ({item, setSelectedItem, setIsOpen}) => {
  return (
    <tr key={item.media_id} className="pizza-card">
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <button
          onClick={() => {
            setSelectedItem(item);
            setIsOpen(true);
          }}
        >
          Open
        </button>
      </td>
    </tr>
  );
};

export default MediaRow;
