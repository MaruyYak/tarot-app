# Таро ✦ — AI таролог

Персональный AI таролог с профессиональными трактовками на основе классических книг по Таро.

## Возможности

- **AI трактовки** на основе базы знаний из книг по Таро (78 карт)
- **8 раскладов**: Карта дня, Прошлое·Настоящее·Будущее, Кельтский крест, Совместимость, Календарь, Кармический, Путь
- **Раздел «День»**: 4 типа однокарточных раскладов на каждый день
- **Структурированная трактовка** по вкладкам: Кратко / Подробно / Карты / Сферы
- **История раскладов** с сохранением в облако (Turso)
- **3 колоды**: Gold, Purple, Rose
- **PWA** — устанавливается на iOS и Android как нативное приложение
- **Лимит**: 20 бесплатных трактовок на пользователя

## Стек

| Слой | Технологии |
|------|-----------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| State | Zustand, React Router v6 |
| Backend | Express.js (local), Vercel Serverless Functions (prod) |
| AI | OpenAI GPT-4o |
| База данных | Turso (SQLite edge DB) |
| Деплой | Vercel |

## Локальный запуск

```bash
# Установить зависимости
npm install

# Создать .env файл
cp .env.example .env
# Заполнить OPENAI_API_KEY, TURSO_DATABASE_URL, TURSO_AUTH_TOKEN

# Запустить сервер (фронт + бэк на порту 3001)
node server.js

# Или запустить с hot-reload (фронт на 5173, бэк на 3001)
npm run dev
```

## Переменные окружения

```
OPENAI_API_KEY=        # OpenAI API ключ
TURSO_DATABASE_URL=    # URL базы данных Turso
TURSO_AUTH_TOKEN=      # Токен аутентификации Turso
```

## База знаний карт

База знаний (`src/data/cardKnowledge.json`) извлечена из книг по Таро с помощью скриптов:

```bash
# Положить PDF книги в папку books/
# и запустить по очереди:

npm run books:extract   # извлечь текст из PDF
npm run books:build     # построить базу знаний через AI
```

## Структура проекта

```
src/
  api/          # HTTP клиент (запросы к бэкенду)
  components/   # UI компоненты (карты, навигация, трактовка)
  data/         # Карты, расклады, база знаний
  screens/      # Экраны приложения
  store/        # Zustand сторы
  types/        # TypeScript типы
api/            # Vercel serverless функции
scripts/        # Скрипты обработки PDF книг
public/         # Статика, изображения карт
```

## Схема базы данных (Turso)

```sql
CREATE TABLE readings (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  question TEXT,
  spread TEXT,
  drawn_cards TEXT,
  interpretation TEXT,
  created_at INTEGER
);

CREATE TABLE usage (
  user_id TEXT PRIMARY KEY,
  interpretation_count INTEGER DEFAULT 0
);
```
