import { useNavigate } from 'react-router';
import {useAuthentication} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';

const LoginForm = () => {
  const {postLogin} = useAuthentication();
  const navigate = useNavigate();
  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async (inputs) => {
    try {
      await postLogin(inputs);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );


  console.log(inputs);
  return (
    <>
      <h1>Login</h1>
      <form
        onSubmit={(evt) => {
          handleSubmit(evt);
        }}
      >
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={(evt) => {
              handleInputChange(evt);
            }}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={(evt) => {
              handleInputChange(evt);
            }}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
