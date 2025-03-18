import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import SignupForm from './Components/SignupForm/SignupForm';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import HomePage from './Components/HomePage/HomePage';
import CarsPage from './Components/CarsPage/CarsPage';
import Account from './Components/Account/Account';
import AvailableMovies from './Components/AvailableMovies/AvailableMovies';
import AvailableFoods from './Components/AvailableFoods/AvailableFoods';
import Booking from './Components/Booking/Booking';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/cars' element={<CarsPage />} />
        <Route path='/account' element={<Account />} />
        <Route path='/movies' element={<AvailableMovies />} />
        <Route path='/foods' element={<AvailableFoods />} />
        <Route path='/booking/:carId' element={<Booking />} />
      </Routes>
    </Router>
  );
}

export default App;