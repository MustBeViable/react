import PropTypes from 'prop-types';
import {useUser} from '../hooks/apiHooks';

const Profile = () => {
  const {user} = useUser();

  if (!user) {
    return <p>Loading profile…</p>;
  }

  return (
    <section>
      <h1>Profile</h1>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {user.level_name}
      </p>
      <p>
        <strong>User ID:</strong> {user.user_id}
      </p>
      <p>
        <strong>Created at:</strong>{' '}
        {new Date(user.created_at).toLocaleString()}
      </p>
    </section>
  );
};

Profile.propTypes = {};

export default Profile;
