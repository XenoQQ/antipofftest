import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { AppDispatch, RootState } from '../../features/TeamList/store/store';
import { fetchMembers } from '../../features/TeamList/store/membersSlice';
import MemberItem from '../MemberItem/MemberItem';
import { logout } from '../../features/TeamList/store/authSlice';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
`;

const Header = styled.div`
    position: relative;

    display: flex;
    width: 100%;
    height: 265px;

    background-color: #512689;

    justify-content: center;
    align-items: center;
`;

const HeaderContentWrapper = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    width: 846px;
    height: 137px;

    justify-content: center;
    align-items: center;
`;

const HeaderContentTitle = styled.div`
    width: 447px;
    height: 75px;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 64px;
    color: #ffffff;

    text-align: center;
`;

const HeaderContent = styled.div`
    width: 846px;
    height: 46px;

    margin-top: 16px;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #f8f8f8;

    text-align: center;
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
`;

const MembersWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;

    min-width: 1280px;
    min-height: 546px;

    margin-top: 48px;
`;

const Morebutton = styled.div`
    display: flex;
`;

const MembersList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const members = useSelector((state: RootState) => state.members.members);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchMembers({ page: 1, perPage: 8 }));
    }, [dispatch]);

    const handleExit = () => {
        dispatch(logout());
        navigate('./login');
    };
    return (
        <Wrapper>
            <Header>
                <HeaderContentWrapper>
                    <HeaderContentTitle>Наша команда</HeaderContentTitle>
                    <HeaderContent>
                        Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и
                        умеющие находить выход из любых, даже самых сложных ситуаций.
                    </HeaderContent>
                </HeaderContentWrapper>
                <ExitButton onClick={() => handleExit()}>Выход</ExitButton>
            </Header>
            <MembersWrapper>
                {members?.data.map((member) => (
                    <MemberItem
                        key={member.id}
                        id={member.id}
                        email={member.email}
                        first_name={member.first_name}
                        last_name={member.last_name}
                        avatar={member.avatar}
                    />
                ))}
            </MembersWrapper>
        </Wrapper>
    );
};

export default MembersList;
