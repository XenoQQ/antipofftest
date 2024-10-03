import React, { useState } from 'react';
import { styled, css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch, RootState } from '../../features/TeamList/store/store';
import { cleanError, loginUser } from '../../features/TeamList/store/authSlice';

import { ReactComponent as ShowIcon } from '../../../assets/ShowIcon.svg';
import { ReactComponent as ShowIconOverline } from '../../../assets/ShowIconOverline.svg';

const Wrapper = styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;

    width: 468px;
    min-height: 200px;

    padding: 16px;

    border-radius: 16px;
    box-shadow: 0px 4px 20px 0px #00000014;

    @media (max-width: 768px) {
        top: 64px;
        left: 0;
        transform: translate(0, 0);

        box-sizing: border-box;
        width: 100vw;

        padding: 16px;
    }
`;

const FormWrapper = styled.div`
    position: relative;

    width: 100%;
    min-height: 200px;
`;

const FormTitle = styled.h2`
    width: 100%;
    height: 23px;

    margin: 0;
    padding: 0;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #151317;

    align-self: flex-start;
`;

const FieldWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;

    width: 100%;
    min-height: 78px;

    margin-top: 16px;
`;

const FieldTitle = styled.div`
    display: flex;
    width: 100%;
    height: 22px;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #151317;

    align-items: center;
`;

const FieldInputWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 48px;

    margin-top: 8px;

    background-color: #f8f8f8;
    border-radius: 8px;

    justify-content: space-between;
    align-items: center;
`;

const EmailInputWrapper = styled.div<{ $isvalid: string }>`
    display: flex;
    width: 100%;
    height: 48px;

    margin-top: 8px;

    background-color: #f8f8f8;
    border-radius: 8px;

    justify-content: space-between;
    align-items: center;

    ${({ $isvalid }) =>
        $isvalid !== ''
            ? css`
                  box-shadow: 0 0 0 1px #ff6161;
              `
            : css``}
`;

const FieldInput = styled.input`
    display: flex;
    height: 16px;

    margin: 16px 8px 16px 16px;

    background-color: #f8f8f8;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: #808185;

    border: none;
    justify-content: flex-start;
    align-items: center;

    &:focus {
        border: none;
        outline: none;
    }
`;

const SubmitButton = styled.button`
    display: flex;
    width: 100%;
    height: 48px;

    background-color: #512689;
    border-radius: 8px;

    margin-top: 24px;

    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: white;

    justify-content: center;
    align-items: center;

    cursor: pointer;
`;

const SubmitButtonTitle = styled.div`
    display: flex;
    width: 156px;
    height: 22px;

    color: #f8f8f8;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;

    align-items: center;
    justify-content: center;
`;

const RegisteredNote = styled.div`
    margin: 10px 0 0 0;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 10px;
    color: #808185;

    text-decoration: underline;

    text-align: center;

    cursor: pointer;
`;

const SauronEye = styled.div`
    position: relative;
    right: 8px;

    width: 24px;
    height: 24px;

    cursor: pointer;
`;

const IconWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    height: 24px;
    width: 24px;

    justify-content: center;
    align-items: center;
`;

const ErrorBoxEmail = styled.div`
    height: 12px;

    margin-top: 4px;

    color: #ff6161;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 10px;
`;

const ErrorBoxAuth = styled.div`
    position: absolute;
    height: 12px;
    bottom: -14px;

    color: #ff6161;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 10px;
`;

const Note = styled.div`
    z-index: 9999;
    position: absolute;
    right: -350px;

    width: 300px;
    height: auto;

    padding: 10px;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: black;
    font-size: 12px;

    border-radius: 16px;
    box-shadow: 0px 4px 20px 0px #00000014;

    @media (max-width: 768px) {
        display: none;
    }
`;

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('eve.holt@reqres.in');
    const [password, setPassword] = useState<string>('cityslicka');
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const error = useSelector((state: RootState) => state.auth.error);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const isValidEmail = (email: string): string => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email) ? '' : 'Некорректный email';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const resultAction = await dispatch(loginUser({ email, password }));

        if (loginUser.fulfilled.match(resultAction)) {
            navigate('../');
        }
    };

    const handleRegisterRoute = () => {
        dispatch(cleanError());
        navigate('../register');
    };

    
    return (
        <Wrapper onSubmit={handleSubmit}>
            <Note>
                API позволяет вход только для этого пользователя (но с любым паролем, кроме пустого), по другим
                вариантам токен не может быть получен, так что я подставил его по-умолчанию. Впрочем, форма корректно
                работает и обрабатывает ошибку при выполнении некорректного запроса с другим логином. Так же в макете
                вообще не было формы логина, так что я вынес вход и регистрацию в разные компоненты. Доступ к форме
                регистрации внизу, как это обычно делается.
            </Note>
            <FormWrapper>
                <FormTitle>Вход</FormTitle>
                <FieldWrapper>
                    <FieldTitle>Электронная почта</FieldTitle>
                    <EmailInputWrapper $isvalid={isValidEmail(email)}>
                        <FieldInput type="text" value={email} onChange={(e) => setEmail(e.target.value)}></FieldInput>
                    </EmailInputWrapper>
                </FieldWrapper>
                <ErrorBoxEmail>{isValidEmail(email)}</ErrorBoxEmail>
                <FieldWrapper>
                    <FieldTitle>Пароль</FieldTitle>
                    <FieldInputWrapper>
                        <FieldInput
                            type={passwordVisible ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></FieldInput>
                        <SauronEye onClick={() => setPasswordVisible((prevstate) => !prevstate)}>
                            <IconWrapper>
                                <ShowIcon />
                            </IconWrapper>
                            {!passwordVisible && (
                                <IconWrapper>
                                    <ShowIconOverline />
                                </IconWrapper>
                            )}
                        </SauronEye>
                        <ErrorBoxAuth>{error}</ErrorBoxAuth>
                    </FieldInputWrapper>
                </FieldWrapper>
            </FormWrapper>
            <SubmitButton type="submit">
                <SubmitButtonTitle>Войти</SubmitButtonTitle>
            </SubmitButton>
            <RegisteredNote onClick={() => handleRegisterRoute()}>Нет аккаунта? Создать аккаунт</RegisteredNote>
        </Wrapper>
    );
};

export default LoginForm;
