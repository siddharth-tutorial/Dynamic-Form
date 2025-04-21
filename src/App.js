import { Route, Routes } from 'react-router';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DynamicForm from './DynamicForm';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dynamicform' element={<DynamicForm/>} />
      </Routes>
    </div>
  );
}

export default App;
