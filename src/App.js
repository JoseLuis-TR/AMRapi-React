import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './assets/sass/main.sass';
import Index from './components/index';
import Error404 from "./components/404";
import Results from "./components/searchResults";
import ProductDetails from "./components/productDetails";
import SavedList from "./components/savedList";
import Contact from "./components/contact";
import Login from "./components/login";
import Register from "./components/register";

function App() {
  return (

    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/results" element={<Results />} />
        <Route path="/product" element={<ProductDetails />}/>
        <Route path="/savedlist" element={<SavedList />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path='*' element={<Error404 />}/>
      </Routes>
    </Router>

  );
}

export default App;
