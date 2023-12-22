import './App.css';
import { Navbar } from './layout/NavbarAndFooter/Navbar';
import { ExploreTopBooks } from './layout/HomePage/components/ExploreTopBooks';
import { Carousel } from './layout/HomePage/components/Carousel';
import { Heros } from './layout/HomePage/components/Heros';
import { LibraryServices } from './layout/HomePage/components/LibraryServices';
import { Footer } from './layout/NavbarAndFooter/Footer';
import { HomePage } from './layout/HomePage/HomePage';
import { SearchBookPage } from './layout/SearchBookPage/SearchBookPage';
 

export const  App=()=> {
  return (
    <div>
    <Navbar/>
    {/* <HomePage/> */}
    <SearchBookPage/>
    <Footer/>
    </div>
  );
}

 
