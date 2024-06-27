interface City {
    name: string;
    latitude: number;
    longitude: number;
  }
  
  const degreesToRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
  };
  
  export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const earthRadiusKm = 6371;
  
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return earthRadiusKm * c;
  };
  
  export const calculateTotalDistance = async (cities: City[]): Promise<number> => {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    let totalDistance = 0;
  
    for (let i = 0; i < cities.length - 1; i++) {
      const { latitude: lat1, longitude: lon1 } = cities[i];
      const { latitude: lat2, longitude: lon2 } = cities[i + 1];
  
      totalDistance += calculateDistance(lat1, lon1, lat2, lon2);
    }
  
    return totalDistance;
  };