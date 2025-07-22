
'use client'

import { useEffect, useState } from 'react'

import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

interface WeatherData {
  temperature_2m: number;
  weather_code: number;
}

const getWeatherIcon = (code: number) => {
  switch (code) {
    case 0:
      return <WiDaySunny size={32} />;
    case 1:
    case 2:
    case 3:
      return <WiCloudy size={32} />;
    case 45:
    case 48:
      return <WiFog size={32} />;
    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return <WiRain size={32} />;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return <WiSnow size={32} />;
    case 95:
    case 96:
    case 99:
      return <WiThunderstorm size={32} />;
    default:
      return <WiCloudy size={32} />;
  }
};

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>('Konum alınıyor...');

  useEffect(() => {
    const fetchWeatherForLocation = (latitude: number, longitude: number) => {
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`)
        .then(res => res.json())
        .then(data => {
          setWeather(data.current);
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(geoData => {
              setCity(geoData.address.city || geoData.address.town || 'Bölgeniz');
            })
            .catch(() => setCity('Bölgeniz'));
        })
        .catch(err => {
          setError('Hava durumu alınamadı.');
        });
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherForLocation(latitude, longitude);
        },
        (error) => {
          setError('Konum izni verilmedi.');
          setCity('Bilinmeyen Konum');
        }
      );
    } else {
      setError('Tarayıcı konumu desteklemiyor.');
    }

  }, []);

  if (error) {
    return (
      <div className="text-right">
        <p className="font-bold text-lg text-red-500">Hata</p>
        <p className="text-xs text-gray-400">{error}</p>
      </div>
    );
  }
  
  if (!weather) {
    return (
      <div className="text-right">
        <p className="font-bold text-lg animate-pulse">--°C</p>
        <p className="text-xs text-gray-400">{city}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {getWeatherIcon(weather.weather_code)}
      <div className="text-right">
        <p className="font-bold text-lg">{weather.temperature_2m}°C</p>
        <p className="text-xs text-gray-400">{city}</p>
      </div>
    </div>
  );
}