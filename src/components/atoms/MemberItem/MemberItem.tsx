import { styled } from 'styled-components';
import { MemberData } from './types';

const Wrapper = styled.div`
    position: relative;

    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 305px;
    min-height: 263px;

    border-radius: 10px;
    box-shadow: 0px 1px 3.98px 0px #33333326;

    justify-content: center;
    align-items: center;
`;

const MemberPic = styled.img`
    width: 124px;
    height: 124px;
    border-radius: 100px;

    margin-top: 36px;

    object-fit: cover;
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
`;

const LikeWrapper = styled.div`
    width: 265px;
    min-height: 28px;

    margin-top: 16px;

    border: 1px solid blue;
`;

const MemberItem: React.FC<MemberData> = ({ id, email, first_name, last_name, avatar }) => {
    return (
        <Wrapper>
            <MemberPic src={avatar} />
            <MemberName>{first_name + ' ' + last_name}</MemberName>
            <LikeWrapper></LikeWrapper>
        </Wrapper>
    );
};

export default MemberItem;
