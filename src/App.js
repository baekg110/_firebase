import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

function App() {
    const { isAuthReady } = useAuthContext();
    return (
        <div className="App">
            {isAuthReady ? (
                <BrowserRouter>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/signup" element={<Signup />}></Route>
                    </Routes>
                </BrowserRouter>
            ) : (
                'loading...'
            )}
        </div>
    );
}

export default App;
