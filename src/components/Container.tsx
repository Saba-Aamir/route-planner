import styled from 'styled-components';
import BG from '../assets/images/background.png';

function Container({ children } : any) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

export default Container;

const Wrapper = styled.section`
  padding: 3rem;
  background: url(${BG}) no-repeat center center;
  background-size: cover;
  min-height: 100vh; 
  display: flex;
  align-items: start;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;