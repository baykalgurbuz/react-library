import './App.css';
import { Navbar } from './layout/NavbarAndFooter/Navbar';
import { ExploreTopBooks } from './layout/HomePage/components/ExploreTopBooks';
import { Carousel } from './layout/HomePage/components/Carousel';
import { Heros } from './layout/HomePage/components/Heros';
import { LibraryServices } from './layout/HomePage/components/LibraryServices';
import { Footer } from './layout/NavbarAndFooter/Footer';
import { HomePage } from './layout/HomePage/HomePage';
import { SearchBookPage } from './layout/SearchBookPage/SearchBookPage';
import { BrowserRouter, Navigate, Route,Router,Routes, useNavigate } from 'react-router-dom';
import { BookCheckoutPage } from './layout/BookCheckoutPage/BookCheckoutPage';
import { oktaConfig } from './lib/oktaConfig';
import {OktaAuth,toRelativeUrl} from '@okta/okta-auth-js';
import { LoginCallback, Security } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { config } from 'process';

const oktaAuth =new OktaAuth(oktaConfig);

export const  App=()=> {
  const navigate =useNavigate();
  const customAuthHandler = () =>
    {
      navigate('/login');
    }

    const history =useNavigate();

    const restoreOriginalUri =async(_oktaAuth :any,originalUri:any)=>{
      const relativeUrl = toRelativeUrl(originalUri || '/', window.location.origin);
      navigate(relativeUrl, { replace: true });  
    }

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
    <Navbar/>
    <div className='flex-grow-1'>
    <Routes>
    <Route path='/' element={<Navigate to="/home" />}/>
    <Route path='/home' element={<HomePage/>}/>
    <Route path='/search' element={<SearchBookPage/>}/>
    <Route path='/checkout/:bookId' element={<BookCheckoutPage/>}/>
    <Route path='/login' element={<LoginWidget config={oktaConfig} />} />
    <Route path='/login/callback'  element={<LoginCallback/>} />
    </Routes>
    </div>
    <Footer/>
    </Security>
    </div>
  );
}

 
