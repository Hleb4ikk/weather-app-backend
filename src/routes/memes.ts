import express from 'express';
import path from 'path';

import { loadMemes, saveMemes } from '../data_operations/dataOperations';

enum MemeCategory {
  freezing = 'freezing',
  cold = 'cold',
  zero = 'zero',
  mild = 'mild',
  warm = 'warm',
  hot = 'hot',
}

function isValidCategory(value: string): value is MemeCategory {
  return Object.values(MemeCategory).includes(value as MemeCategory);
}

const router = express.Router();
const memesPath = path.join(__dirname, '../memes.json');

router.post('/', (req, res) => {
  const { joke, category } = req.body;

  try {
    const memes = loadMemes(memesPath);

    if (!isValidCategory(category)) {
      res.status(400).json({
        code: 400,
        message: 'Неверный формат запроса.',
      });
    }

    if (!memes[category] && isValidCategory(category)) {
      memes[category] = [];
    }

    memes[category].push(joke);
    saveMemes(memes, memesPath);

    res.status(201).json({
      code: 201,
      message: `Шутка добавлена!`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 500,
      message: 'Ошибка при сохранении мема.',
    });
  }
});

export default router;
