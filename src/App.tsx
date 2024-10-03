import FeatureTeam from './components/features/TeamList/FeatureTeam';
import { Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <Routes>
            <Route path="/*" element={<FeatureTeam />} />
        </Routes>
    );
};

export default App;
