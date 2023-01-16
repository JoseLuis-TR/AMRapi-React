import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './assets/sass/main.sass';
import Index from './components/views/index';
import Error404 from "./components/views/404";
import Results from "./components/views/searchResults";
import ProductDetails from "./components/views/productDetails";
import SavedList from "./components/views/savedList";
import Contact from "./components/views/contact";
import Login from "./components/views/login";
import Register from "./components/views/register";
import UserProfile from "./components/views/userProfile";

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
        <Route path="/profile" element={<UserProfile />}/>
        <Route path='*' element={<Error404 />}/>
      </Routes>
    </Router>

  );
}

export default App;
