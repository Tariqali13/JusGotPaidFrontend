import styled from 'styled-components';

export const Wrapper = styled.section``;
export const TextWrapper = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;
export const HeadingOur = styled.span`
  font-size: 60px;
  color: rgb(51, 51, 51);
`;

export const HeadingSponsors = styled.span`
  font-size: 60px;
  font-weight: 800;
  color: rgb(238, 0, 51);
`;

export const BackgroundImage = styled.div`
  background: url(./img/slider-background.jpg);
`;

export const TextOverLay = styled.div`
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 500px;
`;

export const HeadingWrapper = styled.div`
  text-align: center;
  padding-top: 100px;
`;

export const HeadingRed = styled.span`
  font-size: 88px;
  font-weight: 800;
  line-height: 110px;
  color: rgb(238, 0, 51);

  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

export const HeadingWhite = styled.span`
  font-size: 88px;
  font-weight: 800;
  line-height: 110px;
  color: rgb(255, 255, 255);

  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

export const RedBox = styled.div`
  width: 100%;
  height: 85px;
  background-color: rgb(238, 0, 51);
  border-radius: 10px;
  text-align: center;

  @media (max-width: 991px) {
    height: 85px;
  }
`;

export const BoxText = styled.span`
  font-size: 22px;
  color: rgb(255, 255, 255);
  line-height: 4;
  font-weight: 700;
`;
export const LabelInfo = styled.p`
  color: rgb(238, 0, 51);
  font-size: 12px;
`;

export const WhiteButton = styled.button`
  background: #fff;
  width: 100%;
  border-radius: 50px;
  height: 50px;
  border: 1px solid #fff;
  color: rgb(238, 0, 51);
  font-weight: 700;
`;

export const RedButton = styled.button`
  background: rgb(238, 0, 51);
  width: 100%;
  border-radius: 50px;
  height: 50px;
  border: 1px solid rgb(238, 0, 51);
  color: #fff;
  font-weight: 700;
`;
