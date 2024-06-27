import styled from 'styled-components';
import { ErrorMessage } from 'formik';
import AsyncSelect from 'react-select/async';
import { City } from '../data/cities';

interface FormFieldProps {
    label: string;
    name: string;
    value: City | null;
    placeholder: string;
    loadOptions: (inputValue: string) => Promise<City[]>;
    onChange: (option: City | null) => void; 
    index?: number;
    removable?: boolean;
    handleRemove?: (indexToRemove: number) => void;
    error: string | undefined;
    touched: boolean | undefined;
  };

const FormField = ({ label, name, value, placeholder, loadOptions, onChange, removable = false, handleRemove, index = 0, error, touched } : FormFieldProps) => {
  return (
    <Wrapper style={{ marginTop: name === 'origin' ? 0 : '1.5rem' }}>
      <IconContainer style={{ marginTop: error && touched ? 0 : '1.25rem', marginBottom:  error && touched ? '0.8rem' : 0 }}>
        <FieldIcon>
          {name === 'destination' ? (
            <span className="material-symbols-outlined" style={PinStyle}>location_on</span>
          ) : (
            <span className="material-symbols-outlined" style={CircleStyle}>circle</span>
          )}
        </FieldIcon>
        {(name !== 'destination') && 
          <FieldDots>
          {[...Array(5)].map((_, index) => (
            <Dot key={index}>·</Dot>
          ))}
        </FieldDots>
        }
      </IconContainer>
      <FieldContainer>
        <Label htmlFor={name}>{label}</Label>
        <InputContainer>
          <AsyncSelect
            name={name}
            loadOptions={loadOptions}
            onChange={onChange}
            value={value}
            getOptionLabel={(option: City) => option.name}
            getOptionValue={(option: City) => option.name}
            placeholder={placeholder}
            isClearable
            classNames={{
              control: () => 'form-field',
            }}
          />
          {(removable && handleRemove) && (
            <Icon>
              <span className="material-symbols-outlined" onClick={() => handleRemove(index)}>
                close
              </span>
            </Icon>
          )}
        </InputContainer>
        <ErrorMessage name={name} component="div" className="error" style={ErrorStyle}/>
      </FieldContainer>
    </Wrapper>
  );
}

export default FormField;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
 .form-field {
    border: 1px solid #E5E7EB;
    border-radius: 6px;
    width: 300px;
    font-family: 'Inter';
    margin-top: 0.2rem;
    &:focus-visible {
      border: 1px solid #5f5f5f;
    }
    @media (max-width: 576px) {
      width: 215px;
    }
  }
`;

const IconContainer = styled.div`
  line-height: 0.5;
  margin-top: 1.25rem;
`;

const FieldContainer = styled.div`
  margin-left: 2rem;
`;

const Label = styled.label`
font-size: 1rem;
font-weight: 500;
margin-bottom: 0.2rem;
color: #374151;
`;

const InputContainer = styled.div`
display: flex;
align-items: center;
`;

const Icon = styled.div`
  margin: 0.25rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  `;
  
const ErrorStyle = {
  marginTop: '0.5rem', 
  fontSize: '0.9rem', 
  color: '#FF0000', 
  fontWeight: '500'
};

const FieldIcon = styled.div`
`;

const CircleStyle = {
    color: '#374151',
    fontSize: '1.4rem'
}

const PinStyle = {
    color: '#FF0000',
    fontSize: '1.4rem'
}

const FieldDots = styled.div`
  position: absolute;
  top: 57px;
  margin-left: 9.5px;
  width: 3px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Dot = styled.div`
  font-size: 20px;
  line-height: 0.1;
`;