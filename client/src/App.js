import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import { Router } from 'react-router-dom'; 
// import 'antd/dist/reset.css';

function App() {
  return (
    // <div className="container-fluid">
    //   <h1 className="text-center">Hello</h1>
    // </div>
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}


export function ProtectedRoutes(props) {
  if (localStorage.getItem('user')) {
    return props.children
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
