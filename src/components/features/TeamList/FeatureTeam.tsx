import { Route, Routes } from 'react-router-dom';

import TeamList from '../../atoms/MembersList/MembersList';
import LoginForm from '../../atoms/LoginForm/LoginForm';
import PrivateRoute from '../../utils/PrivateRoute';
import RegisterForm from '../../atoms/RegisterForm/RegisterForm';

const FeatureTeam = () => {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute component={TeamList} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
        </Routes>
    );
};

export default FeatureTeam;
