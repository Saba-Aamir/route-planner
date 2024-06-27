import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateProps {
    label: string;
    name: string;
    value: Date;
    updateValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  };

function DateField ({ label, name, value, updateValue } : DateProps) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <DatePicker selected={value} onChange={(date) => updateValue(name, date ? date : value)} minDate={new Date()} dateFormat={'dd/MM/yyyy'}/>
    </Wrapper>
  );
}

export default DateField;

const Wrapper = styled.div`
  .react-datepicker {
    font-family: 'Inter', sans-serif;
  }
  .react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header {
    color: #374151;
  }
  .react-datepicker__input-container input {
    border: 1px solid #E5E7EB;
    border-radius: 6px;
    padding: 10.2px 10px;
    width: 90px;
    font-family: 'Inter';
    letter-spacing: 0.5px;
  }
  .react-datepicker__header, .react-datepicker__day--keyboard-selected {
    background-color: #C7D1F4;
  }
  .react-datepicker__day--selected {
    background-color: #7786D2;
  }
  .react-datepicker__navigation-icon::before {
    border-color: #374151;
  }
`;

const Label = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
  margin-top: 1.5rem;
  color: #374151;
`;