import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppDispatch } from '../../features/TeamList/store/store';
import { fetchMembers } from '../../features/TeamList/store/membersSlice';
import { logout } from '../../features/TeamList/store/authSlice';

import { ReactComponent as MoreIcon } from '../../../assets/MoreIcon.svg';
import { ReactComponent as ExitIcon } from '../../../assets/ExitIcon.svg';

import MemberItem, { MemberData } from '../MemberItem/MemberItem';

const Wrapper = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    width: 100%;

    justify-content: center;
    align-items: center;

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

    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        height: 281px;
    }
`;

const HeaderContentWrapper = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    width: 846px;
    height: 137px;

    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        width: 343px;
        height: 153px;
    }
`;

const HeaderContentTitle = styled.div`
    width: 447px;
    height: 75px;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 64px;
    color: #ffffff;

    text-align: center;

    @media (max-width: 768px) {
        width: 251px;
        height: 42px;
        font-size: 36px;
    }
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

    @media (max-width: 768px) {
        font-size: 16px;
        width: 334px;
        height: 95px;
    }
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

const MembersWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;

    min-width: 1280px;
    min-height: 546px;

    margin-top: 48px;

    @media (max-width: 768px) {
        min-width: 0px;
        width: 100%;
        display: flex;
        flex-direction: column;

        margin-top: 32px;

        justify-content: center;
        align-items: center;
    }
`;

const MoreButton = styled.div`
    display: flex;

    box-sizing: border-box;
    min-width: 170px;
    min-height: 40px;

    padding: 8px 16px 8px 16px;
    margin-top: 56px;
    margin-bottom: 64px;

    border: 1px solid #151317;
    border-radius: 8px;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #151317;

    justify-content: space-between;
    align-items: center;

    cursor: pointer;

    @media (max-width: 768px) {
        margin-top: 32px;
    }
`;

const MembersList: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(1);
    const [allMembers, setAllMembers] = useState<MemberData[]>([]);

    useEffect(() => {
        dispatch(fetchMembers({ page, perPage: isMobile ? 4 : 8 }))
            .unwrap()
            .then((data) => {
                setAllMembers((prev) => [...prev, ...data.data]);
            });
    }, [dispatch, page, isMobile]);

    const loadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleExit = () => {
        dispatch(logout());
        navigate('/login');
    };

    const [likedMembers, setLikedMembers] = useState<number[]>(() => {
        const savedLikes = sessionStorage.getItem('likedMembers');
        return savedLikes ? JSON.parse(savedLikes) : [];
    });

    const handleLike = (id: number) => {
        setLikedMembers((prev) => {
            let updatedLikes;
            if (prev.includes(id)) {
                updatedLikes = prev.filter((memberId) => memberId !== id);
            } else {
                updatedLikes = [...prev, id];
            }

            sessionStorage.setItem('likedMembers', JSON.stringify(updatedLikes));
            return updatedLikes;
        });
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
                {!isMobile && <ExitButton onClick={() => handleExit()}>Выход</ExitButton>}
                {isMobile && (
                    <ExitIconWrapper onClick={() => handleExit()}>
                        <ExitIcon />
                    </ExitIconWrapper>
                )}
            </Header>
            <MembersWrapper>
                {allMembers?.map((member) => (
                    <MemberItem
                        key={member.id}
                        id={member.id}
                        email={member.email}
                        first_name={member.first_name}
                        last_name={member.last_name}
                        avatar={member.avatar}
                        isLiked={likedMembers.includes(member.id)}
                        onLike={() => handleLike(member.id)}
                    />
                ))}
            </MembersWrapper>
            <MoreButton onClick={loadMore}>
                Показать ещё
                <MoreIcon />
            </MoreButton>
        </Wrapper>
    );
};

export default MembersList;
