
import './App.css';
import { AddTask } from './components/AddTask';
import { Login } from './components/Login';
import { Routes, Route } from "react-router-dom"
import { ShowTasks } from './components/ShowTasks';
import { Register } from './components/Register';

function App() {
  return (
    <div className="App">
      
      <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
       <Route path="/show" element={<ShowTasks />} />
      </Routes>


     
    </div>
  );
}

export default App;
