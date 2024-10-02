import { useEffect } from 'react';
import FeatureTeam from './components/features/TeamList/FeatureTeam';
import { Routes, Route } from 'react-router-dom';
import { checkToken } from './components/features/TeamList/store/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './components/features/TeamList/store/store';

const App = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(checkToken());
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/*" element={<FeatureTeam />} />
        </Routes>
    );
};

export default App;
