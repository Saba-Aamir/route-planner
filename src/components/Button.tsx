import styled from 'styled-components';

interface ButtonProps {
    label: string;
    disabled: boolean;
    type: "button" | "submit" | "reset" | undefined;
    handleClick?: () => void;
  };

function Button({ label, disabled = true, type = 'button', handleClick } : ButtonProps) {
  return (
    <StyledButton onClick={handleClick} disabled={disabled} type={type}>
        {label}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button`
  color: #fff;
  background-color: #374151;
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  &:disabled {
    background-color: #E5E7EB;
    cursor: default;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;