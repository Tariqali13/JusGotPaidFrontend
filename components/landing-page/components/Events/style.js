import styled from 'styled-components';

export const Wrapper = styled.section``;
export const RowWrapper = styled.div`
  text-align: center;
  padding-top: 60px;
  padding-bottom: 60px;
`;
export const HeadingOne = styled.span`
  color: rgb(51, 51, 51);
  font-size: 60px;
  font-weight: 100;
  line-height: 75px;
`;
export const HeadingTwo = styled.span`
  font-size: 60px;
  font-weight: 800;
  line-height: 75px;
  color: rgb(238, 0, 51);
`;
export const Event = styled.div`
    border 1px solid rgb(238, 0, 51);
    border-radius : 10px;
    padding: 10px;
    margin-bottom: 20px;

    &:hover {
        background: rgb(238, 0, 51);
        color: #fff;
    }
`;

export const Label = styled.span`
  font-size: 18px;
  font-weight: 600;
  &:hover {
    color: #fff;
  }
`;

export const LabelValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: rgb(238, 0, 51);
  float: right;
  text-transform: uppercase;
  &:hover {
    color: #fff;
  }
`;
