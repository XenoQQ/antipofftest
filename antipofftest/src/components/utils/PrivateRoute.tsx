import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../features/TeamList/store/store';

interface PrivateRouteProps {
    component: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
    const reduxToken = useSelector((state: RootState) => state.auth.token);
    const localToken = localStorage.getItem('featureTeamToken');

    console.log('LocalToken: ', localToken, 'ReduxToken: ', reduxToken);

    const isTokenExist = () => {
        return reduxToken || localToken;
    };

    return isTokenExist() ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
