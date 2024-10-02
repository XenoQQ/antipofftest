import axios from 'axios';

import { Credentials, LoginResponse } from '../components/atoms/LoginForm/types';
import { RegisterResponse } from '../components/atoms/RegisterForm/types';

const API_URL = 'https://reqres.in/api';



export const login = async (credentials: Credentials): Promise<LoginResponse> => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};

export const register = async (credentials: Credentials): Promise<RegisterResponse> => {
    const response = await axios.post(`${API_URL}/register`, credentials);
    return response.data
}
