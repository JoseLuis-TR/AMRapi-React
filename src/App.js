import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Index from './components/index';
import Error404 from "./components/404";
import './assets/sass/main.sass';

function App() {
  return (

    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path='*' element={<Error404 />}/>
      </Routes>
    </Router>

  );
}

export default App;
