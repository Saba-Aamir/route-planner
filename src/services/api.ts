import axios from 'axios';

const mockCities = ['Paris', 'Marseille', /* other cities */];

export const fetchCities = async (keyword: string): Promise<string[]> => {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (keyword.toLowerCase() === 'fail') {
    throw new Error('Failed to fetch cities');
  }

  return mockCities.filter(city => city.toLowerCase().includes(keyword.toLowerCase()));
};

export const calculateDistances = async (cities: string[]): Promise<number[]> => {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (cities.includes('Dijon')) {
    throw new Error('Failed to calculate distances');
  }

  // Calculation logic here
  return [1];
};
