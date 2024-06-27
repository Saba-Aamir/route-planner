import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { cities, City } from '../data/cities';
import styled from 'styled-components';
import Card from '../components/Card';
import FormField from '../components/FormField';
import Counter from '../components/Counter';
import DateField from '../components/DatePicker';
import Button from '../components/Button';

  const SearchForm: React.FC = () => {
    const navigate = useNavigate();

    const loadOptions = async (inputValue: string) => {
        return cities.filter(city => city.name.toLowerCase().includes(inputValue.toLowerCase()));
      };

    const initialValues = {
        origin: null as City | null,
        intermediateCities: [] as City[],
        destination: null as City | null,
        date: new Date(),
        passengers: 1,
      };
    
     const validationSchema = Yup.object().shape({
        origin: Yup.object().nullable().required('Origin city is required'),
        destination: Yup.object().nullable().required('Destination city is required'),
        intermediateCities: Yup.array().of(Yup.object().nullable().required('Intermediate city is required').shape({
          name: Yup.string().required(),
          latitude: Yup.number().required(),
          longitude: Yup.number().required(),
        })),
        date: Yup.date().required('Date is required'),
        passengers: Yup.number().required('Number of passengers is required').min(1, 'Must be at least 1 passenger'),
      });

    const handleSubmit = (values: typeof initialValues) => {
        const intermediateCitiesNames = values.intermediateCities.map(city => city?.name).join(',');
        navigate(`/search-results?origin=${values.origin?.name}&intermediateCities=${intermediateCitiesNames}&destination=${values.destination?.name}&date=${values.date.toISOString()}&passengers=${values.passengers}`);
      };

  return (
    <Card>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({values, setFieldValue, errors, touched}) => (
              <Form className='form' data-testid="search-form">
                <Row>
                  <Section style={{ width: '388px', paddingRight: 0, display: 'flex', flexDirection: 'column' }} className='primary-section'>
                      <FormField
                        name="origin"
                        label="Origin"
                        loadOptions={loadOptions}
                        value={values.origin}
                        onChange={(option: City | null) => setFieldValue('origin', option)}
                        placeholder="Select origin city"
                        error={errors.origin}
                        touched={touched.origin}
                        />
                      <FieldArray name="intermediateCities">
                        {({ push, remove }: { push: (value: any) => void; remove: (index: number) => void }) => (
                          <>
                            {values.intermediateCities.map((city, index) => (
                              <FormField
                                key={index} 
                                name={`intermediateCities.${index}`}
                                label="Intermediate City"
                                loadOptions={loadOptions}
                                value={city}
                                onChange={(option: City | null) => setFieldValue(`intermediateCities.${index}`, option)}
                                placeholder="Select intermediate city"
                                removable={true} 
                                handleRemove={() => remove(index)} 
                                index={index}
                                error={`${errors.intermediateCities ? errors.intermediateCities[index] : ''}`}
                                touched={touched.intermediateCities ? touched.intermediateCities[index] ? true : false : undefined}
                              />
                            ))}
                            <Link onClick={() => push(null)} style={{ order: 999 }}>
                              <span className="material-symbols-outlined" style={{ fontSize: '20px', marginRight: '5px' }}>
                                add_circle
                              </span>
                              Add Intermediate City
                            </Link>
                          </>
                        )}
                      </FieldArray>
                        <FormField
                          name="destination"
                          label="Destination"
                          loadOptions={loadOptions}
                          onChange={(option: City | null) => setFieldValue('destination', option)}
                          value={values.destination}
                          placeholder="Select destination city"
                          error={errors.destination}
                          touched={touched.destination}
                      />
                  </Section>
                  <Section className="secondary-section">
                      <Counter label='Passengers' name="passengers" value={values.passengers} updateValue={setFieldValue}/>
                      <DateField label='Date' name="date" value={values.date} updateValue={setFieldValue}/>
                  </Section>
                </Row>
                <Section style={{ paddingTop: 0, display: 'flex', justifyContent: 'center' }}>
                    <Button label='Submit' type='submit' disabled={false}/>
                </Section>
            </Form>
            )}
        </Formik>
    </Card>
  );
}

export default SearchForm;

const Section = styled.div`
  padding: 2rem;
`;

const Row = styled.div`
  display: flex;
   @media (max-width: 768px) {
    flex-direction: column;
  }
  }
  .primary-section {
    @media (max-width: 576px) {
    width: 300px !important;
  }
  }
  .secondary-section {
   @media (max-width: 768px) {
    padding-top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
    h3 {
       @media (max-width: 768px) {
        margin-top: 0;
      }
    }
  }
`;

const Link = styled.div`
  color: #7786D2;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  width: fit-content;
  margin-top: 1.5rem;
  &:hover {
    color: #596ac0;
  }
`;
