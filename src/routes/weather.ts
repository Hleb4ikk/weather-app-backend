import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { loadMemes } from '../data_operations/dataOperations';

dotenv.config();
const router = express.Router();

const memesPath = path.join(__dirname, '../memes.json');

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE';

function getRandomJoke(memes: Record<string, string[]>, category: string): string {
  const jokes = memes[category] || [];
  if (jokes.length === 0) return 'Шуток для этой температуры пока нет 🙁';
  const index = Math.floor(Math.random() * jokes.length);
  return jokes[index];
}

function getCategory(temp: number): string {
  if (temp < -15) return 'freezing';
  if (temp < 0) return 'cold';
  if (temp === 0) return 'zero';
  if (temp <= 22) return 'mild';
  if (temp <= 35) return 'warm';
  return 'hot';
}

router.get('/', async (req, res) => {
  const city = req.query.city;

  if (city) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=ru`,
    );

    const data = await response.json();

    switch (Number(data.cod)) {
      case 200:
        res.status(200).json({
          code: 200,
          data: {
            city: data.name,
            generalData: {
              main: data.weather[0].main,
              description: data.weather[0].description,
              icon: data.weather[0].icon,
            },
            weather: {
              temp: data.main.temp,
              feels_like: data.main.feels_like,
              temp_min: data.main.temp_min,
              temp_max: data.main.temp_max,
              humidity: data.main.humidity,
            },
            wind: { speed: data.wind.speed, deg: data.wind.deg },
            joke: getRandomJoke(loadMemes(memesPath), getCategory(data.main.temp)),
          },
          message: 'Ок',
        });
        break;
      case 404:
        res.status(404).json({ code: 404, message: 'Город не найден' });
        break;
      default:
        res.status(500).json({
          code: 500,
          message: 'Внутренняя ошибка сервера',
        });
        break;
    }
  } else {
    res.status(400).json({
      code: 400,
      message: 'Запрос имеет неправильный формат',
    });
  }
});

export default router;
