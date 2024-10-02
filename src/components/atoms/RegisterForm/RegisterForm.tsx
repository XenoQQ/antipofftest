import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { AppDispatch, RootState } from '../../features/TeamList/store/store';
import { registerUser } from '../../features/TeamList/store/authSlice';
import { cleanError } from '../../features/TeamList/store/authSlice';

import { ReactComponent as ShowIcon } from '../../../assets/ShowIcon.svg';

import { ReactComponent as ShowIconOverline } from '../../../assets/ShowIconOverline.svg';

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    width: 500px;
    min-height: 500px;

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
    min-height: 400px;

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

const SubmitButton = styled.button`
    display: flex;
    width: 100%;
    height: 48px;

    background-color: #512689;
    border-radius: 8px;

    color: white;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 400;

    justify-content: center;
    align-items: center;
`;

const SubmitButtonTitle = styled.div`
    display: flex;
    width: 156px;
    height: 22px;

    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;

    align-items: center;
    justify-content: center;
`;

const ErrorBox = styled.div`
    height: 12px;

    margin-top: 4px;

    color: #ff6161;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 10px;
`;

const LoginNote = styled.div`
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

const RegisterForm: React.FC = () => {
    const [name, setName] = useState<string>('Username');
    const [email, setEmail] = useState<string>('eve.holt@reqres.in');
    const [pass1, setPass1] = useState<string>('pistol');
    const [pass1visible, setPass1Visible] = useState<boolean>(false);
    const [pass2visible, setPass2Visible] = useState<boolean>(false);
    const [pass2, setPass2] = useState<string>('pistol');

    const isValidEmail = (email: string): string => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email) ? '' : 'Некорректный email';
    };

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const error = useSelector((state: RootState) => state.auth.error);

    const handleSubmit = async () => {
        const resultAction = await dispatch(registerUser({ email, password: pass2 }));

        if (registerUser.fulfilled.match(resultAction)) {
            navigate('../');
        }
    };

    const handleLoginRoute = () => {
        dispatch(cleanError());
        navigate('../');
    };
    return (
        <Wrapper>
            <Note>
                API позволяет пройти регистрацию только с этим конкретным пользователем (но с любым паролем), так что он
                был подставлен по-умолчанию. API принимает только логин\пароль, имя не участвует в запросе. В ответ по
                корректному запросу приходит айди юзера, который нигде в данном макете не участвует, и токен, который
                сразу же используется для логина.
            </Note>
            <FormWrapper>
                <Title>Регистрация</Title>
                <Field>
                    <FieldTitle>Имя</FieldTitle>
                    <FieldInputWrapper>
                        <FieldInput type="text" value={name} onChange={(e) => setName(e.target.value)}></FieldInput>
                    </FieldInputWrapper>
                </Field>
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
                </Field>
                <Field>
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
                        </SauronEye>{' '}
                    </FieldInputWrapper>
                    <ErrorBox>{error}</ErrorBox>
                </Field>
            </FormWrapper>
            <SubmitButton onClick={() => handleSubmit()}>
                <SubmitButtonTitle>Зарегистрироваться</SubmitButtonTitle>
            </SubmitButton>
            <LoginNote onClick={() => handleLoginRoute()}>Уже зарегистрированы? Войти</LoginNote>
        </Wrapper>
    );
};

export default RegisterForm;
