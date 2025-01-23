import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddContent from './pages/AddContent';
import ContentPage from './pages/ContentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/create-content' element={<AddContent/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/detail-content' element={<ContentPage/>}/>
      </Routes> 
    </Router>
  );
}

export default App;
