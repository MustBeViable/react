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
    <div className="max-w-md mx-auto mt-8 bg-neutral-800 rounded-2xl p-6 shadow-lg">
      <h1 className="mb-4 text-2xl font-semibold text-center">Register</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={(evt) => {
          handleSubmit(evt);
        }}
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="registeruser"
            className="text-sm font-medium text-neutral-100"
          >
            Username
          </label>
          <input
            name="username"
            type="text"
            id="registeruser"
            onChange={(evt) => {
              handleInputChange(evt);
            }}
            autoComplete="username"
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="registeremail"
            className="text-sm font-medium text-neutral-100"
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            id="registeremail"
            onChange={(evt) => {
              handleInputChange(evt);
            }}
            autoComplete="email"
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="registerpassword"
            className="text-sm font-medium text-neutral-100"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={(evt) => {
              handleInputChange(evt);
            }}
            autoComplete="new-password"
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="mt-2 inline-block w-full rounded-md bg-[#363636] px-4 py-2 text-sm font-medium text-white no-underline hover:bg-[#111111] transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
