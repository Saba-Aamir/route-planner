import styled from 'styled-components';

function Card({ children } : any) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

export default Card;

const Wrapper = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 16px;
   @media (max-width: 768px) {
    padding: 0;
  }
`;