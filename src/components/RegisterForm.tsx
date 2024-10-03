import React, { useState } from 'react';
import { styled, css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch, RootState } from './store/store';
import { registerUser } from './store/authSlice';
import { cleanError } from './store/authSlice';

import { ReactComponent as ShowIcon } from '../assets/ShowIcon.svg';
import { ReactComponent as ShowIconOverline } from '../assets/ShowIconOverline.svg';

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    width: 468px;
    min-height: 487px;

    padding: 16px;

    border-radius: 16px;
    box-shadow: 0px 4px 20px 0px #00000014;

    @media (max-width: 768px) {
        top: 64px;
        left: 0;
        transform: translate(0, 0);

        box-sizing: border-box;
        width: 100%;

        padding: 16px;
    }
`;

const FormWrapper = styled.div`
    position: relative;

    width: 100%;
    min-height: 415px;
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

const EmailInputWrapper = styled.div<{ $isvalid: string | null }>`
    display: flex;

    width: 100%;
    height: 48px;

    margin-top: 8px;

    background-color: #f8f8f8;
    border-radius: 8px;

    justify-content: space-between;
    align-items: center;

    ${({ $isvalid }) =>
        $isvalid
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
    font-weight: 400;
    font-size: 14px;
    color: white;

    justify-content: center;
    align-items: center;

    cursor: pointer;
`;

const SubmitButtonTitle = styled.div`
    display: flex;
    width: 156px;
    height: 22px;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: white;

    align-items: center;
    justify-content: center;
`;

const LoginNote = styled.div`
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

    height: 24px;
    width: 24px;

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
    bottom: -14px;

    height: 12px;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 10px;
    color: #ff6161;
`;

const Note = styled.div`
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

const RegisterForm: React.FC = () => {
    const [name, setName] = useState('Username');
    const [email, setEmail] = useState('eve.holt@reqres.in');
    const [pass1, setPass1] = useState('pistol');
    const [pass1visible, setPass1Visible] = useState(false);
    const [pass2, setPass2] = useState('pistol');
    const [pass2visible, setPass2Visible] = useState(false);

    const error = useSelector((state: RootState) => state.auth.error);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const isValidEmail = (email: string): string | null => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email) ? null : 'Некорректный email';
    };

    const handleSubmit = async () => {
        const resultAction = await dispatch(registerUser({ email, password: pass2 }));

        if (registerUser.fulfilled.match(resultAction)) {
            navigate('../');
        }
    };

    const handleLoginRoute = () => {
        dispatch(cleanError());
        navigate('../login');
    };

    return (
        <Wrapper>
            <FormWrapper>
                <FormTitle>Регистрация</FormTitle>
                <FieldWrapper>
                    <FieldTitle>Имя</FieldTitle>
                    <FieldInputWrapper>
                        <FieldInput type="text" value={name} onChange={(e) => setName(e.target.value)}></FieldInput>
                    </FieldInputWrapper>
                </FieldWrapper>
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
                            type={pass1visible ? 'text' : 'password'}
                            value={pass1}
                            onChange={(e) => setPass1(e.target.value)}
                        ></FieldInput>
                        <SauronEye onClick={() => setPass1Visible((prevstate) => !prevstate)}>
                            <IconWrapper>
                                <ShowIcon />
                            </IconWrapper>
                            {!pass1visible && (
                                <IconWrapper>
                                    <ShowIconOverline />
                                </IconWrapper>
                            )}
                        </SauronEye>
                    </FieldInputWrapper>
                </FieldWrapper>
                <FieldWrapper>
                    <FieldTitle>Подтвердите пароль</FieldTitle>
                    <FieldInputWrapper>
                        <FieldInput
                            type={pass2visible ? 'text' : 'password'}
                            value={pass2}
                            onChange={(e) => setPass2(e.target.value)}
                        ></FieldInput>
                        <SauronEye onClick={() => setPass2Visible((prevstate) => !prevstate)}>
                            <IconWrapper>
                                <ShowIcon />
                            </IconWrapper>
                            {!pass2visible && (
                                <IconWrapper>
                                    <ShowIconOverline />
                                </IconWrapper>
                            )}
                        </SauronEye>
                    </FieldInputWrapper>
                    <ErrorBoxAuth>{error}</ErrorBoxAuth>
                </FieldWrapper>
            </FormWrapper>
            <SubmitButton onClick={() => handleSubmit()}>
                <SubmitButtonTitle>Зарегистрироваться</SubmitButtonTitle>
            </SubmitButton>
            <LoginNote onClick={() => handleLoginRoute()}>Уже зарегистрированы? Войти</LoginNote>
            <Note>
                API позволяет пройти регистрацию только с этим конкретным пользователем (но с любым паролем), так что он
                был подставлен по-умолчанию. API принимает только логин\пароль, имя не участвует в запросе. В ответ по
                корректному запросу приходит айди юзера, который нигде в данном макете не участвует, и токен, который
                сразу же используется для логина.
            </Note>
        </Wrapper>
    );
};

export default RegisterForm;
