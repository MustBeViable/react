import './App.css';
import Home from './views/Home';
import {Route, BrowserRouter, Routes} from 'react-router';
import Layout from './components/Layout';
import Single from './views/Single';
import Profile from './views/Profile';
import Upload from './views/Upload';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/single" element={<Single />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
