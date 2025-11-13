import {useState} from 'react';

const Greeting = () => {
  const [userText, setUserText] = useState('');
  return (
    <div>
      <h4>Greeting all</h4>
      <input
        type="text"
        value={userText}
        onChange={(e) => {
          console.log("change happened");
          setUserText(e.target.value);
          console.log(userText);
        }}
      ></input>
    </div>
  );
};

export default Greeting;
