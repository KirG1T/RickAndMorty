import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import CharInfo from './pages/CharInfo';
import MainPage from './pages/MainPage';
import NotFoundBlock from './components/NotFoundBlock';

const App: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/character/:id" element={<CharInfo />} />
            <Route path="*" element={<NotFoundBlock />} />
        </Routes>
    );
};

export default App;
