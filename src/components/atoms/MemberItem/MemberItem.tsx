import { styled } from 'styled-components';

import { ReactComponent as LikeIcon } from '../../../assets/LikeIcon.svg';
import { ReactComponent as LikeIconActive } from '../../../assets/LikeIconActive.svg';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    width: 305px;
    min-height: 263px;

    border-radius: 10px;
    box-shadow: 0px 1px 3.98px 0px #33333326;

    align-items: center;

    &:hover {
        box-shadow: 0 0 0 1px #000000;
    }
`;

const MemberPic = styled.img`
    width: 124px;
    height: 124px;

    margin-top: 36px;

    border-radius: 100px;

    cursor: pointer;
`;

const MemberName = styled.div`
    min-width: 139px;
    height: 23px;

    margin-top: 16px;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #151317;

    text-align: center;

    cursor: pointer;
`;

const LikeWrapper = styled.div`
    display: flex;
    width: 265px;
    min-height: 28px;

    margin-top: 16px;

    justify-content: flex-end;
    align-items: center;
`;

const LikeIconWrapper = styled.div`
    display: flex;
    width: 30px;
    height: 28px;

    border-radius: 4px;
    justify-content: center;
    align-items: center;

    background-color: #f8f8f8;

    cursor: pointer;
`;

export interface MemberData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    isLiked: boolean;
    onLike: () => void;
}

const MemberItem: React.FC<MemberData> = ({ id, email, first_name, last_name, avatar, isLiked, onLike }) => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(`/members/${id}`);
    };
    return (
        <Wrapper>
            <MemberPic onClick={() => onClick()} src={avatar} />
            <MemberName onClick={() => onClick()}>{first_name + ' ' + last_name}</MemberName>
            <LikeWrapper>
                <LikeIconWrapper onClick={onLike}>{isLiked ? <LikeIconActive /> : <LikeIcon />}</LikeIconWrapper>
            </LikeWrapper>
        </Wrapper>
    );
};

export default MemberItem;
