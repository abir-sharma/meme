import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import AddMeme from './pages/AddMeme'
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Payment from './pages/Payment';



function App() {
  return (
    <>
    <Navbar />
    <Routes>
    <Route exact path="/" element={<Home />}/>
    <Route path="/addMeme" element={<AddMeme />} />
    <Route path="/tip/:username/:account" element={<Payment />} />
    </Routes>
    <Footer />

    </>
  );
}

export default App;
