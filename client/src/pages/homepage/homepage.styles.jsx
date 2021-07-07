import styled from "styled-components";

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 80px;

  @media screen and (max-width: 545px) {
    padding: 20px 50px;
  }

  @media screen and (max-width: 420px) {
    padding: 20px 15px;
  }
`;
