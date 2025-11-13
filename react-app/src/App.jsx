import './App.css';
import ReactiaPurkissa from './components/ReactiaPurkissa';
import Greeting from './components/Greeting';
import { Footer } from './components/Footer';

function App() {

  const styles = {
    backgroundColor: 'black',
    color: 'white',
  };
  return (
    <>
      <div style={styles}>
        <h1>Reactia purkissa 2025</h1>
        <ReactiaPurkissa />
        <Greeting />
      </div>
      < Footer name="tekstiä jeejee" times="2" isReal={true}/>
      < Footer name="jeejee tekstiä" times={30} isReal={true}/>
    </>
  );
}

export default App;
