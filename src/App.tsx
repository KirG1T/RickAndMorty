import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import CharInfo from './pages/CharInfo';
import MainPage from './pages/MainPage';

const App: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/character/:id" element={<CharInfo />} />
        </Routes>
    );
};

export default App;
