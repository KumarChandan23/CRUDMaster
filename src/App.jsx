
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import './app.css';
import ProfileFetch from './Components/profileFetch';
import ProfileCreate from './Components/profileCreate';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Home />
      <Routes >
        <Route path="/" element={<ProfileFetch />}  />
        <Route path="/users" element={<ProfileFetch />}  />
        <Route path="/profileCreate" element={<ProfileCreate />}  />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
