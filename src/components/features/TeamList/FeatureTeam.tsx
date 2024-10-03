import { Route, Routes } from 'react-router-dom';

import TeamList from '../../atoms/MembersList/MembersList';
import LoginForm from '../../atoms/LoginForm/LoginForm';
import PrivateRoute from '../../utils/PrivateRoute';
import RegisterForm from '../../atoms/RegisterForm/RegisterForm';
import MemberDetails from '../../atoms/MemberDetails/MemberDetails';

import { useEffect } from 'react';
import { checkToken } from './store/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { Navigate } from 'react-router-dom';

const FeatureTeam = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(checkToken());
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={<PrivateRoute component={TeamList} />} />
            <Route path="/login" element={<LoginForm key="login" />} />
            <Route path="/register" element={<RegisterForm key="register" />} />
            <Route path="/members/:id" element={<MemberDetails key="member" />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default FeatureTeam;
