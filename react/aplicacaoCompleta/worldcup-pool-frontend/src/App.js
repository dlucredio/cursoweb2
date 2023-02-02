import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import PlaceBet from './pages/PlaceBet';
import ViewBets from './pages/ViewBets';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="placeBet" element={<PlaceBet />} />
                    <Route path="viewBets" element={<ViewBets />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
