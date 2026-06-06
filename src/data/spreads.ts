import type { Spread } from '@/types'

export const SPREADS: Spread[] = [
  {
    id: 'one-card',
    nameRu: 'Карта дня',
    description: 'Одна карта — чёткий ответ или направление на сейчас',
    cardCount: 1,
    positions: [
      {
        id: 'answer',
        nameRu: 'Ответ',
        description: 'Главное послание карт',
      },
    ],
  },
  {
    id: 'three-card',
    nameRu: 'Прошлое · Настоящее · Будущее',
    description: 'Три карты раскрывают динамику ситуации во времени',
    cardCount: 3,
    positions: [
      {
        id: 'past',
        nameRu: 'Прошлое',
        description: 'Что привело к текущей ситуации',
      },
      {
        id: 'present',
        nameRu: 'Настоящее',
        description: 'Суть происходящего сейчас',
      },
      {
        id: 'future',
        nameRu: 'Будущее',
        description: 'Куда ведёт текущий путь',
      },
    ],
  },
  {
    id: 'celtic-cross',
    nameRu: 'Кельтский крест',
    description: 'Классический десятикарточный расклад — полная картина ситуации',
    cardCount: 10,
    positions: [
      { id: 'present', nameRu: 'Настоящее', description: 'Суть ситуации' },
      { id: 'challenge', nameRu: 'Препятствие', description: 'Что мешает или пересекает путь' },
      { id: 'foundation', nameRu: 'Основа', description: 'Корень ситуации' },
      { id: 'past', nameRu: 'Прошлое', description: 'Недавние события' },
      { id: 'potential', nameRu: 'Возможное', description: 'Лучший возможный исход' },
      { id: 'near-future', nameRu: 'Ближайшее', description: 'Что придёт вскоре' },
      { id: 'self', nameRu: 'Вы сами', description: 'Ваша позиция и внутреннее состояние' },
      { id: 'environment', nameRu: 'Окружение', description: 'Влияние других людей' },
      { id: 'hopes', nameRu: 'Надежды и страхи', description: 'Ваши ожидания' },
      { id: 'outcome', nameRu: 'Итог', description: 'Финальный исход при текущем курсе' },
    ],
  },
]
