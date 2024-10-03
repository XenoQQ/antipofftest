import axios from 'axios';

import { Credentials, LoginResponse } from '../components/store/authSlice';
import { RegisterResponse } from '../components/store/authSlice';

const API_URL = 'https://reqres.in/api';

export const login = async (credentials: Credentials): Promise<LoginResponse> => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};

export const register = async (credentials: Credentials): Promise<RegisterResponse> => {
    const response = await axios.post(`${API_URL}/register`, credentials);
    return response.data;
};
