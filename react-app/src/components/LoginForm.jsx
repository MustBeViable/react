import useForm from '../hooks/formHooks';
import {useUserContext} from '../hooks/contextHooks';

const LoginForm = () => {
  const {handleLogin} = useUserContext();
  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      handleLogin(inputs);
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  return (
    <div className="max-w-md mx-auto mt-8 bg-neutral-800 rounded-2xl p-6 shadow-lg">
      <h1 className="mb-4 text-2xl font-semibold text-center">Login</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={(evt) => {
          handleSubmit(evt);
        }}
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="loginuser"
            className="text-sm font-medium text-neutral-100"
          >
            Username
          </label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={(evt) => {
              handleInputChange(evt);
            }}
            autoComplete="username"
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="loginpassword"
            className="text-sm font-medium text-neutral-100"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={(evt) => {
              handleInputChange(evt);
            }}
            autoComplete="current-password"
            className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="mt-2 inline-block w-full rounded-md bg-[#363636] px-4 py-2 text-sm font-medium text-white no-underline hover:bg-[#111111] transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
