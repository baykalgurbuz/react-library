import './App.css';
import { Navbar } from './layout/NavbarAndFooter/Navbar';
import { ExploreTopBooks } from './layout/HomePage/ExploreTopBooks';
import { Carousel } from './layout/HomePage/Carousel';
import { Heros } from './layout/HomePage/Heros';
import { LibraryServices } from './layout/HomePage/LibraryServices';
 

function App() {
  return (
    <div>
    <Navbar/>
    <ExploreTopBooks/>
    <Carousel/>
    <Heros/>
    <LibraryServices/>
    </div>
  );
}

export default App;
