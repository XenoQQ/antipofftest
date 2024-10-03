import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoginForm from './components/LoginForm';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import MemberDetails from './components/MemberDetails';
import RegisterForm from './components/RegisterForm';
import { checkToken } from './components/store/authSlice';
import { AppDispatch } from './components/store/store';
import MembersList from './components/MembersList';

const App = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(checkToken());
    }, [dispatch]);

    return (
        <Routes>
            <Route path="/" element={<PrivateRoute component={MembersList} />} />
            <Route path="/members/:id" element={<PrivateRoute component={MemberDetails} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default App;
