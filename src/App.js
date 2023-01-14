import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './assets/sass/main.sass';
import Index from './components/index';
import Error404 from "./components/404";
import Results from "./components/searchResults";
import ProductDetails from "./components/productDetails";

function App() {
  return (

    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/results" element={<Results />} />
        <Route path="/product" element={<ProductDetails />}/>
        <Route path='*' element={<Error404 />}/>
      </Routes>
    </Router>

  );
}

export default App;
