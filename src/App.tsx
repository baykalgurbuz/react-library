import './App.css';
import { Navbar } from './layout/NavbarAndFooter/Navbar';
import { ExploreTopBooks } from './layout/HomePage/components/ExploreTopBooks';
import { Carousel } from './layout/HomePage/components/Carousel';
import { Heros } from './layout/HomePage/components/Heros';
import { LibraryServices } from './layout/HomePage/components/LibraryServices';
import { Footer } from './layout/NavbarAndFooter/Footer';
import { HomePage } from './layout/HomePage/HomePage';
import { SearchBookPage } from './layout/SearchBookPage/SearchBookPage';
import { BrowserRouter, Navigate, Route,Router,Routes } from 'react-router-dom';
 

export const  App=()=> {
  return (
    <div className='d-flex flex-column min-vh-100'>
    <Navbar/>
    <div className='flex-grow-1'>
    <Routes>
    <Route path='/' element={<Navigate to="/home" />}/>
    <Route path='/home' element={<HomePage/>}/>
    <Route path='/search' element={<SearchBookPage/>}/>
    </Routes>
    </div>
    <Footer/>
    </div>
  );
}

 
