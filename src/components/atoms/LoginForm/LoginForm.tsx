import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { cleanError, loginUser } from '../../features/TeamList/store/authSlice';
import { AppDispatch, RootState } from '../../features/TeamList/store/store';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as ShowIcon } from '../../../assets/ShowIcon.svg';

import { ReactComponent as ShowIconOverline } from '../../../assets/ShowIconOverline.svg';

const Wrapper = styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    width: 500px;
    min-height: 200px;

    margin: 0 auto;
    padding: 16px;
    gap: 24px;

    border-radius: 16px;
    box-shadow: 0px 4px 20px 0px #00000014;
`;

const FormWrapper = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    width: 468px;
    min-height: 200px;

    justify-content: space-between;
    align-items: flex-start;
`;

const Title = styled.h2`
    position: relative;

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

const Field = styled.div`
    position: relative;

    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 468px;
    min-height: 78px;

    margin-top: 16px;
`;

const FieldTitle = styled.div`
    display: flex;
    height: 22px;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #151317;

    align-items: center;
`;

const FieldInputWrapper = styled.div`
    display: flex;
    box-sizing: border-box;
    width: 468px;
    height: 48px;

    margin-top: 8px;

    background-color: #f8f8f8;
    border-radius: 8px;

    justify-content: space-between;
    align-items: center;
`;

const FieldInput = styled.input`
    display: flex;
    height: 16px;
    min-width: 412px;

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

const SauronEye = styled.div`
    position: relative;
    right: 12px;

    height: 24px;
    width: 24px;

    cursor: pointer;
`;

const IconWrapper = styled.div`
    display: flex;

    position: absolute;
    top: 0;
    left: 0;
    height: 24px;
    width: 24px;

    justify-content: center;
    align-items: center;
`;

const SubmitButton = styled.button`
    display: flex;
    width: 100%;
    height: 48px;

    background-color: #512689;
    border-radius: 8px;

    color: #f8f8f8;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 400;

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

const RegisterNote = styled.div`
    bottom: 10px;

    margin: -10px auto 0 auto;

    width: auto;
    height: auto;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 10px;
    color: #808185;

    text-decoration: underline;

    text-align: center;

    cursor: pointer;
`;

const ErrorBox = styled.div`
    position: absolute;
    height: 12px;
    left: 5px;
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
`;

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('eve.holt@reqres.in');
    const [password, setPassword] = useState<string>('cityslicka');
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const error = useSelector((state: RootState) => state.auth.error);

    const isValidEmail = (email: string): string => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email) ? '' : 'Некорректный email';
    };

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

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
                <Title>Вход</Title>
                <Field>
                    <FieldTitle>Электронная почта</FieldTitle>
                    <FieldInputWrapper>
                        <FieldInput type="text" value={email} onChange={(e) => setEmail(e.target.value)}></FieldInput>
                    </FieldInputWrapper>
                    <ErrorBox>{isValidEmail(email)}</ErrorBox>
                </Field>
                <Field>
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
                        <ErrorBox>{error}</ErrorBox>
                    </FieldInputWrapper>
                </Field>
            </FormWrapper>
            <SubmitButton type="submit">
                <SubmitButtonTitle>Войти</SubmitButtonTitle>
            </SubmitButton>
            <RegisterNote onClick={() => handleRegisterRoute()}>Нет аккаунта? Создать аккаунт</RegisterNote>
        </Wrapper>
    );
};

export default LoginForm;
