import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/';
import Users from './pages/Users/';
import Posts from './pages/Posts/';
import Login from './pages/Login/';
import NotFound from './pages/NotFound';
import './App.css'

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
            <Route path="not-found" element={<NotFound />} />
        </Routes>
    );
}

export default App;
