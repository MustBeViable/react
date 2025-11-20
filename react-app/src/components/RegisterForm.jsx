import {useUser, useAuthentication} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import {useNavigate} from 'react-router';

const RegisterForm = () => {
  const {postLogin} = useAuthentication();
  const {postUser} = useUser();
  const navigate = useNavigate();

  const initValues = {
    username: '',
    email: '',
    password: '',
  };

  const doRegister = async (inputs) => {
    try {
      const result = await postUser(inputs);
      console.log('Register result:', result);
      await postLogin(inputs);
      navigate('/');
    } catch (error) {
      console.error('Register failed', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  console.log(inputs);

  return (
    <>
      <h1>Register</h1>
      <form
        onSubmit={(evt) => {
          handleSubmit(evt);
        }}
      >
        <div>
          <label htmlFor="registeruser">Username</label>
          <input
            name="username"
            type="text"
            id="registeruser"
            onChange={(evt) => {
              handleInputChange(evt);
            }}
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="registeremail">Email</label>
          <input
            name="email"
            type="email"
            id="registeremail"
            onChange={(evt) => {
              handleInputChange(evt);
            }}
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="registerpassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={(evt) => {
              handleInputChange(evt);
            }}
            autoComplete="new-password"
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
