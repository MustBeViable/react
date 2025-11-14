import Single from "../views/Single";
import { Link } from "react-router";

const MediaRow = ({item, setSelectedItem}) => {
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
        <Link to="/single" state={item} onClick={()=> {setSelectedItem(item)}}>Show</Link>
      </td>
    </tr>
  );
};

export default MediaRow;
