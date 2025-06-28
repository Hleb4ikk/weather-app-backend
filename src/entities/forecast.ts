type DescriptiveData = {
  main: string;
  description: string;
  icon: string;
};

type Weather = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
};

type Wind = {
  speed: number;
  deg: number;
};

type Forecast = {
  city: string;
  generalData: DescriptiveData;
  weather: Weather;
  wind: Wind;
};

export type { DescriptiveData, Weather, Wind, Forecast };
