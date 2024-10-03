import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { AppDispatch } from '../../features/TeamList/store/store';
import { logout } from '../../features/TeamList/store/authSlice';
import { MemberData } from '../MemberItem/MemberItem';

import { ReactComponent as ExitIcon } from '../../../assets/ExitIcon.svg';
import { ReactComponent as BackIcon } from '../../../assets/BackIcon.svg';
import { ReactComponent as PhoneIcon } from '../../../assets/PhoneIcon.svg';
import { ReactComponent as EmailIcon } from '../../../assets/EmailIcon.svg';

const Wrapper = styled.div`
    position: relative;

    display: flex;
    flex-wrap: wrap;
    width: 100%;

    @media (max-width: 768px) {
        box-sizing: border-box;
        width: 100vw;
    }
`;

const Header = styled.div`
    position: relative;

    display: flex;

    width: 100%;
    height: 265px;

    background-color: #512689;

    @media (max-width: 768px) {
        height: 412px;
    }
`;

const HeaderContentWrapper = styled.div`
    position: relative;
    top: 39px;
    left: 187px;

    display: flex;
    width: 664px;
    height: 187px;

    justify-content: space-between;
    align-items: center;

    flex-wrap: wrap;

    @media (min-width: 768px) {
        justify-content: space-between;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

const MemberPic = styled.img`
    width: 187px;
    height: 187px;

    border-radius: 100px;

    @media (max-width: 768px) {
        position: absolute;
        bottom: 64px;
    }
`;

const MemberInfoWrapper = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    width: 445px;
    height: 129px;

    justify-content: space-between;

    @media (max-width: 768px) {
        width: 100%;
        height: 100%;

        justify-content: flex-start;
    }
`;

const MemberName = styled.div`
    width: 100%;
    height: 75px;

    font-family: 'Roboto', sans-serif;
    font-size: 64px;
    font-weight: 400;
    color: white;

    overflow: visible;
    white-space: nowrap;

    @media (max-width: 768px) {
        margin: 64px auto 0 auto;

        width: 251px;
        height: 42px;

        font-size: 36px;

        text-align: center;
    }
`;

const MemberType = styled.div`
    width: 126px;
    height: 38px;

    font-family: 'Roboto', sans-serif;
    font-size: 32px;
    font-weight: 400;
    color: white;

    @media (max-width: 768px) {
        margin: 16px auto 0 auto;

        width: 79px;
        height: 23px;

        font-size: 20px;

        text-align: center;
    }
`;

const MemberDescription = styled.div`
    width: 630px;
    height: 396px;

    margin-top: 49px;
    margin-bottom: 64px;
    margin-left: 188px;

    margin: 49px 0 64px 188px;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #151317;
    line-height: 21.79px;

    @media (max-width: 768px) {
        width: 100%;
        height: 704px;

        font-size: 16px;

        margin: 136px 16px 20px 16px;
    }
`;

const ContactsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 188px;
    height: 72px;

    margin-top: 49px;
    margin-left: 129px;

    justify-content: space-between;

    @media (max-width: 768px) {
        position: absolute;
        width: 100%;
        height: 72px;

        top: 444px;

        margin: 0 0 0 16px;
    }
`;

const ContactsPhone = styled.div`
    display: flex;
    width: 172px;
    height: 24px;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #151317;

    justify-content: flex-start;
    align-items: center;

    overflow: visible;
    white-space: nowrap;
`;

const IconWrapper = styled.div`
    display: flex;
    width: 24px;
    height: 24px;

    margin-right: 8px;

    justify-content: center;
    align-items: center;
`;

const ContactsEmail = styled.div`
    display: flex;
    width: 188px;
    height: 24px;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #151317;

    justify-content: flex-start;
    align-items: center;

    overflow: visible;
    white-space: nowrap;
`;

const ExitButton = styled.button`
    position: absolute;
    top: 32px;
    right: 80px;

    display: flex;
    min-width: 81px;
    min-height: 38px;

    background-color: transparent;
    border: 1px solid #f8f8f8;
    border-radius: 8px;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #f8f8f8;

    justify-content: center;
    align-items: center;

    cursor: pointer;
`;

const BackButton = styled.button`
    position: absolute;
    top: 32px;
    left: 80px;

    display: flex;
    min-width: 81px;
    min-height: 38px;

    background-color: transparent;
    border: 1px solid #f8f8f8;
    border-radius: 8px;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #f8f8f8;

    justify-content: center;
    align-items: center;

    cursor: pointer;
`;

const BackIconWrapper = styled.div`
    position: absolute;
    top: 12px;
    left: 16px;

    display: flex;
    width: 40px;
    height: 40px;

    justify-content: center;
    align-items: center;

    cursor: pointer;
`;

const ExitIconWrapper = styled.div`
    position: absolute;
    top: 12px;
    right: 16px;

    display: flex;
    width: 40px;
    height: 40px;

    justify-content: center;
    align-items: center;

    cursor: pointer;
`;

const MemberDetails: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const [member, setMember] = useState<MemberData | null>(null);

    useEffect(() => {
        const fetchMember = async () => {
            try {
                const response = await axios.get(`https://reqres.in/api/users/${id}`);

                setMember(response.data.data);
            } catch (error) {
                console.error('Не удалось загрузить данные пользователя');
            }
        };

        fetchMember();
    }, [id]);

    const handleExit = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleBack = () => {
        navigate('/');
    };
    return (
        <Wrapper>
            <Header>
                <HeaderContentWrapper>
                    <MemberPic src={member?.avatar} />
                    <MemberInfoWrapper>
                        <MemberName>{member?.first_name + ' ' + member?.last_name}</MemberName>
                        <MemberType>Партнер</MemberType>
                    </MemberInfoWrapper>
                </HeaderContentWrapper>
                {!isMobile && <BackButton onClick={() => handleBack()}>Назад</BackButton>}
                {isMobile && (
                    <BackIconWrapper onClick={() => handleBack()}>
                        <BackIcon />
                    </BackIconWrapper>
                )}

                {!isMobile && <ExitButton onClick={() => handleExit()}>Выход</ExitButton>}
                {isMobile && (
                    <ExitIconWrapper onClick={() => handleExit()}>
                        <ExitIcon />
                    </ExitIconWrapper>
                )}
            </Header>
            <MemberDescription>
                Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, включая
                такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам
                лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и
                увеличивать продажи, используя самые современные аналитические инструменты. <br />
                <br />В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с
                трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это
                осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в
                том, что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться
                самостоятельно".
                <br />
                <br /> Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную
                предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в
                Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.
            </MemberDescription>
            <ContactsWrapper>
                <ContactsPhone>
                    <IconWrapper>
                        <PhoneIcon />
                    </IconWrapper>
                    +7 (954) 333-44-55
                </ContactsPhone>
                <ContactsEmail>
                    <IconWrapper>
                        <EmailIcon />
                    </IconWrapper>
                    {member?.email}
                </ContactsEmail>
            </ContactsWrapper>
        </Wrapper>
    );
};

export default MemberDetails;
