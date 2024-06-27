import styled from 'styled-components';
import { ErrorMessage } from 'formik';

interface CounterProps {
    label: string;
    name: string;
    value: number;
    updateValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  };

function Counter ({ label, value, name, updateValue } : CounterProps) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Container>
        <Button onClick={() => updateValue(name, value === 0 ? value : value-1)} type='button'>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                remove
            </span>
        </Button>
        <Value>
            {value}
        </Value>
        <Button onClick={() => updateValue(name, value+1)} type='button'>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                add
            </span>
        </Button>
      </Container>
      <ErrorMessage name={name} component="div" className="error" />
    </Wrapper>
  );
}

export default Counter;

const Wrapper = styled.div`

`;

const Label = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
  color: #374151;
  margin-top: 0;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  padding: 6.2px 8px;
  justify-content: space-between;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 4px;
  color: #fff;
  background-color: #C7D1F4;
  border: none;
  padding: 4px;
  cursor: pointer;
  &:hover {
    background-color: #7786D2;
  }
`;

const Value = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
  color: #374151;
  margin: 0;
`;