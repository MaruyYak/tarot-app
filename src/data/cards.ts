import type { TarotCard, Suit } from '@/types'

// ─── Major Arcana ─────────────────────────────────────────────────────────────

const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 'major-0', name: 'The Fool', nameRu: 'Шут', arcana: 'major', suit: null, number: 0,
    keywords: ['новое начало', 'спонтанность', 'свобода'],
    upright: 'Смелый шаг в неизвестность, свежий взгляд на жизнь',
    reversed: 'Безрассудство, отказ взрослеть, упущенные возможности',
    symbol: '🃏', gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
  },
  {
    id: 'major-1', name: 'The Magician', nameRu: 'Маг', arcana: 'major', suit: null, number: 1,
    keywords: ['воля', 'мастерство', 'манифестация'],
    upright: 'Все ресурсы есть — действуй, создавай, воплощай',
    reversed: 'Манипуляция, самообман, нереализованный потенциал',
    symbol: '🪄', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
  },
  {
    id: 'major-2', name: 'The High Priestess', nameRu: 'Верховная Жрица', arcana: 'major', suit: null, number: 2,
    keywords: ['интуиция', 'тайна', 'внутреннее знание'],
    upright: 'Прислушайся к внутреннему голосу — он знает ответ',
    reversed: 'Игнорирование интуиции, скрытые мотивы, поверхностность',
    symbol: '🌙', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
  },
  {
    id: 'major-3', name: 'The Empress', nameRu: 'Императрица', arcana: 'major', suit: null, number: 3,
    keywords: ['изобилие', 'плодородие', 'красота'],
    upright: 'Время расцвета, творческой силы и материального достатка',
    reversed: 'Зависимость, творческий блок, пренебрежение собой',
    symbol: '🌺', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
  },
  {
    id: 'major-4', name: 'The Emperor', nameRu: 'Император', arcana: 'major', suit: null, number: 4,
    keywords: ['власть', 'структура', 'стабильность'],
    upright: 'Порядок, авторитет, надёжная основа для действий',
    reversed: 'Тирания, жёсткость, потеря контроля',
    symbol: '👑', gradient: 'linear-gradient(135deg, #fa709a, #fee140)',
  },
  {
    id: 'major-5', name: 'The Hierophant', nameRu: 'Иерофант', arcana: 'major', suit: null, number: 5,
    keywords: ['традиция', 'духовность', 'наставник'],
    upright: 'Мудрость традиций, духовное руководство',
    reversed: 'Догматизм, нонконформизм, отвержение правил',
    symbol: '🗝️', gradient: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  },
  {
    id: 'major-6', name: 'The Lovers', nameRu: 'Влюблённые', arcana: 'major', suit: null, number: 6,
    keywords: ['любовь', 'выбор', 'гармония'],
    upright: 'Глубокая связь, важный выбор, следование сердцу',
    reversed: 'Дисгармония, избегание ответственности, ценностный конфликт',
    symbol: '♥️', gradient: 'linear-gradient(135deg, #fccb90, #d57eeb)',
  },
  {
    id: 'major-7', name: 'The Chariot', nameRu: 'Колесница', arcana: 'major', suit: null, number: 7,
    keywords: ['победа', 'воля', 'движение'],
    upright: 'Целеустремлённость, контроль над ситуацией, победа',
    reversed: 'Потеря направления, агрессия, неуправляемые силы',
    symbol: '⚡', gradient: 'linear-gradient(135deg, #f7971e, #ffd200)',
  },
  {
    id: 'major-8', name: 'Strength', nameRu: 'Сила', arcana: 'major', suit: null, number: 8,
    keywords: ['мужество', 'терпение', 'внутренняя сила'],
    upright: 'Укрощение страстей мягкостью, скрытая мощь',
    reversed: 'Неуверенность, подавленная сила, трусость',
    symbol: '🦁', gradient: 'linear-gradient(135deg, #ee0979, #ff6a00)',
  },
  {
    id: 'major-9', name: 'The Hermit', nameRu: 'Отшельник', arcana: 'major', suit: null, number: 9,
    keywords: ['уединение', 'поиск', 'мудрость'],
    upright: 'Время для размышления, обращение внутрь себя',
    reversed: 'Изоляция, замкнутость, потеря пути',
    symbol: '🕯️', gradient: 'linear-gradient(135deg, #0f3443, #34e89e)',
  },
  {
    id: 'major-10', name: 'Wheel of Fortune', nameRu: 'Колесо Фортуны', arcana: 'major', suit: null, number: 10,
    keywords: ['судьба', 'цикл', 'перемены'],
    upright: 'Поворот к лучшему, удача, кармический сдвиг',
    reversed: 'Сопротивление переменам, неудача, замкнутый круг',
    symbol: '☸️', gradient: 'linear-gradient(135deg, #654ea3, #eaafc8)',
  },
  {
    id: 'major-11', name: 'Justice', nameRu: 'Справедливость', arcana: 'major', suit: null, number: 11,
    keywords: ['истина', 'закон', 'баланс'],
    upright: 'Справедливый исход, честность, взвешенное решение',
    reversed: 'Несправедливость, уклонение от ответственности, предвзятость',
    symbol: '⚖️', gradient: 'linear-gradient(135deg, #f2709c, #ff9472)',
  },
  {
    id: 'major-12', name: 'The Hanged Man', nameRu: 'Повешенный', arcana: 'major', suit: null, number: 12,
    keywords: ['пауза', 'жертва', 'новый взгляд'],
    upright: 'Добровольная пауза открывает новую перспективу',
    reversed: 'Бесполезная жертва, промедление, мученичество',
    symbol: '⏳', gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
  },
  {
    id: 'major-13', name: 'Death', nameRu: 'Смерть', arcana: 'major', suit: null, number: 13,
    keywords: ['трансформация', 'завершение', 'переход'],
    upright: 'Конец одного цикла — рождение нового',
    reversed: 'Сопротивление переменам, цепляние за прошлое',
    symbol: '🥀', gradient: 'linear-gradient(135deg, #1a1a2e, #6f0000)',
  },
  {
    id: 'major-14', name: 'Temperance', nameRu: 'Умеренность', arcana: 'major', suit: null, number: 14,
    keywords: ['баланс', 'терпение', 'гармония'],
    upright: 'Взвешенность, интеграция противоположностей, исцеление',
    reversed: 'Избыток, нетерпение, внутренний разлад',
    symbol: '✨', gradient: 'linear-gradient(135deg, #0052d4, #4364f7)',
  },
  {
    id: 'major-15', name: 'The Devil', nameRu: 'Дьявол', arcana: 'major', suit: null, number: 15,
    keywords: ['зависимость', 'тень', 'соблазн'],
    upright: 'Осознание ловушек и цепей, работа с тенью',
    reversed: 'Освобождение, избавление от зависимости',
    symbol: '🔗', gradient: 'linear-gradient(135deg, #42275a, #734b6d)',
  },
  {
    id: 'major-16', name: 'The Tower', nameRu: 'Башня', arcana: 'major', suit: null, number: 16,
    keywords: ['потрясение', 'откровение', 'крушение'],
    upright: 'Внезапный кризис, который разрушает ложное — освобождая место для настоящего',
    reversed: 'Избегание неизбежного, страх перемен',
    symbol: '🌩️', gradient: 'linear-gradient(135deg, #c94b4b, #4b134f)',
  },
  {
    id: 'major-17', name: 'The Star', nameRu: 'Звезда', arcana: 'major', suit: null, number: 17,
    keywords: ['надежда', 'вдохновение', 'исцеление'],
    upright: 'Свет после тьмы, возрождение веры, исполнение желаний',
    reversed: 'Отчаяние, потеря надежды, неверие',
    symbol: '⭐', gradient: 'linear-gradient(135deg, #1a1a2e, #4a90e2)',
  },
  {
    id: 'major-18', name: 'The Moon', nameRu: 'Луна', arcana: 'major', suit: null, number: 18,
    keywords: ['иллюзия', 'подсознание', 'страх'],
    upright: 'Путь через туман — доверяй интуиции, не всё то, чем кажется',
    reversed: 'Рассеивание иллюзий, выход из страха',
    symbol: '🌕', gradient: 'linear-gradient(135deg, #0f0c29, #302b63)',
  },
  {
    id: 'major-19', name: 'The Sun', nameRu: 'Солнце', arcana: 'major', suit: null, number: 19,
    keywords: ['радость', 'успех', 'витальность'],
    upright: 'Счастье, ясность, успех и детская радость',
    reversed: 'Самодовольство, нереалистичные ожидания',
    symbol: '☀️', gradient: 'linear-gradient(135deg, #f7971e, #ffd200)',
  },
  {
    id: 'major-20', name: 'Judgement', nameRu: 'Суд', arcana: 'major', suit: null, number: 20,
    keywords: ['пробуждение', 'призыв', 'переоценка'],
    upright: 'Время подвести итоги и откликнуться на призыв к переменам',
    reversed: 'Самокритика, промедление с важным решением',
    symbol: '🎺', gradient: 'linear-gradient(135deg, #b92b27, #1565c0)',
  },
  {
    id: 'major-21', name: 'The World', nameRu: 'Мир', arcana: 'major', suit: null, number: 21,
    keywords: ['завершение', 'целостность', 'триумф'],
    upright: 'Достижение цели, интеграция опыта, полнота жизни',
    reversed: 'Незавершённость, промедление с финальным шагом',
    symbol: '🌍', gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
  },
]

// ─── Minor Arcana Generator ───────────────────────────────────────────────────

type SuitConfig = {
  nameGenitiveRu: string // «Жезлов», «Кубков», etc.
  symbol: string
  gradients: [string, string][]
  suitKeywords: string[]
}

const SUIT_CONFIG: Record<Suit, SuitConfig> = {
  wands: {
    nameGenitiveRu: 'Жезлов',
    symbol: '🔥',
    gradients: [
      ['#f97316','#dc2626'],['#fb923c','#b91c1c'],['#f59e0b','#d97706'],
      ['#fbbf24','#f97316'],['#ef4444','#7f1d1d'],['#f97316','#ea580c'],
      ['#fb923c','#dc2626'],['#fde68a','#f59e0b'],['#f97316','#9a3412'],
      ['#fca5a5','#ef4444'],['#fcd34d','#d97706'],['#fed7aa','#f97316'],
      ['#fef3c7','#f59e0b'],['#fbbf24','#b45309'],
    ],
    suitKeywords: ['творчество', 'страсть', 'энергия'],
  },
  cups: {
    nameGenitiveRu: 'Кубков',
    symbol: '🌊',
    gradients: [
      ['#3b82f6','#1e40af'],['#60a5fa','#2563eb'],['#93c5fd','#3b82f6'],
      ['#38bdf8','#0284c7'],['#7dd3fc','#0ea5e9'],['#bae6fd','#38bdf8'],
      ['#06b6d4','#0e7490'],['#67e8f9','#06b6d4'],['#a5f3fc','#22d3ee'],
      ['#0891b2','#164e63'],['#22d3ee','#0e7490'],['#7dd3fc','#1d4ed8'],
      ['#93c5fd','#1e40af'],['#60a5fa','#1e3a8a'],
    ],
    suitKeywords: ['чувства', 'отношения', 'интуиция'],
  },
  swords: {
    nameGenitiveRu: 'Мечей',
    symbol: '⚔️',
    gradients: [
      ['#94a3b8','#475569'],['#cbd5e1','#64748b'],['#e2e8f0','#94a3b8'],
      ['#64748b','#1e293b'],['#94a3b8','#334155'],['#cbd5e1','#475569'],
      ['#e2e8f0','#64748b'],['#f1f5f9','#94a3b8'],['#94a3b8','#0f172a'],
      ['#475569','#0f172a'],['#64748b','#1e293b'],['#94a3b8','#334155'],
      ['#cbd5e1','#1e293b'],['#e2e8f0','#0f172a'],
    ],
    suitKeywords: ['мысль', 'конфликт', 'истина'],
  },
  pentacles: {
    nameGenitiveRu: 'Пентаклей',
    symbol: '🌿',
    gradients: [
      ['#22c55e','#15803d'],['#4ade80','#16a34a'],['#86efac','#22c55e'],
      ['#16a34a','#14532d'],['#4ade80','#166534'],['#86efac','#15803d'],
      ['#bbf7d0','#22c55e'],['#15803d','#052e16'],['#22c55e','#14532d'],
      ['#4ade80','#052e16'],['#86efac','#166534'],['#d1fae5','#22c55e'],
      ['#a7f3d0','#059669'],['#6ee7b7','#065f46'],
    ],
    suitKeywords: ['деньги', 'работа', 'материальное'],
  },
}

type RankConfig = {
  nameRu: string
  nameEn: string
  keywords: string[]
  upright: string
  reversed: string
}

const RANK_CONFIG: Record<number, RankConfig> = {
  1:  { nameRu: 'Туз',      nameEn: 'Ace',     keywords: ['начало', 'потенциал'],        upright: 'Мощный старт, новая возможность',               reversed: 'Ложный старт, заблокированная энергия' },
  2:  { nameRu: 'Двойка',   nameEn: 'Two',     keywords: ['выбор', 'баланс'],            upright: 'Равновесие, партнёрство, выбор пути',            reversed: 'Нерешительность, дисбаланс' },
  3:  { nameRu: 'Тройка',   nameEn: 'Three',   keywords: ['рост', 'сотрудничество'],     upright: 'Развитие, первые плоды труда',                  reversed: 'Разочарование, конфликт, задержка' },
  4:  { nameRu: 'Четвёрка', nameEn: 'Four',    keywords: ['стабильность', 'отдых'],      upright: 'Надёжная основа, пауза для восстановления',     reversed: 'Застой, скупость, нарушение покоя' },
  5:  { nameRu: 'Пятёрка',  nameEn: 'Five',    keywords: ['испытание', 'потеря'],        upright: 'Вызов, через который можно вырасти',            reversed: 'Выход из кризиса, принятие потери' },
  6:  { nameRu: 'Шестёрка', nameEn: 'Six',     keywords: ['гармония', 'щедрость'],       upright: 'Обмен, взаимопомощь, восстановление баланса',   reversed: 'Долг, зависимость, односторонняя помощь' },
  7:  { nameRu: 'Семёрка',  nameEn: 'Seven',   keywords: ['оценка', 'стратегия'],        upright: 'Взвешенный взгляд, хитрость, настойчивость',   reversed: 'Уклонение, самообман, незавершённость' },
  8:  { nameRu: 'Восьмёрка', nameEn: 'Eight',  keywords: ['мастерство', 'движение'],     upright: 'Быстрое развитие, овладение навыком',           reversed: 'Спешка, разочарование, стагнация' },
  9:  { nameRu: 'Девятка',  nameEn: 'Nine',    keywords: ['завершение', 'плоды'],        upright: 'Почти у цели, накопленная мудрость',            reversed: 'Тревога, паранойя, незащищённость' },
  10: { nameRu: 'Десятка',  nameEn: 'Ten',     keywords: ['итог', 'полнота'],            upright: 'Завершение цикла, кульминация',                 reversed: 'Перегрузка, бремя, крах' },
  11: { nameRu: 'Паж',      nameEn: 'Page',    keywords: ['любопытство', 'ученичество'], upright: 'Свежий взгляд, открытость новому',              reversed: 'Незрелость, рассеянность, пустые слова' },
  12: { nameRu: 'Рыцарь',   nameEn: 'Knight',  keywords: ['действие', 'поиск'],          upright: 'Смелость, движение к цели, рыцарский порыв',   reversed: 'Безрассудство, промедление, разочарование' },
  13: { nameRu: 'Королева', nameEn: 'Queen',   keywords: ['зрелость', 'забота'],         upright: 'Мастерство, чуткость, уверенная в себе сила',   reversed: 'Контроль, холодность, неуверенность' },
  14: { nameRu: 'Король',   nameEn: 'King',    keywords: ['власть', 'мудрость'],         upright: 'Лидерство, зрелая сила, авторитет',             reversed: 'Тирания, слабость, злоупотребление властью' },
}

function generateMinorArcana(): TarotCard[] {
  const suits: Suit[] = ['wands', 'cups', 'swords', 'pentacles']
  const cards: TarotCard[] = []

  for (const suit of suits) {
    const sc = SUIT_CONFIG[suit]
    for (let n = 1; n <= 14; n++) {
      const rc = RANK_CONFIG[n]
      const [from, to] = sc.gradients[n - 1]
      cards.push({
        id: `${suit}-${n}`,
        name: `${rc.nameEn} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
        nameRu: `${rc.nameRu} ${sc.nameGenitiveRu}`,
        arcana: 'minor',
        suit,
        number: n,
        keywords: [...sc.suitKeywords.slice(0, 2), ...rc.keywords],
        upright: `${rc.upright} (сфера: ${sc.suitKeywords[0]})`,
        reversed: rc.reversed,
        symbol: sc.symbol,
        gradient: `linear-gradient(135deg, ${from}, ${to})`,
      })
    }
  }

  return cards
}

export const ALL_CARDS: TarotCard[] = [...MAJOR_ARCANA, ...generateMinorArcana()]

export function drawCards(spread: { positions: { id: string; nameRu: string; description: string }[] }): import('@/types').DrawnCard[] {
  const shuffled = [...ALL_CARDS].sort(() => Math.random() - 0.5)
  return spread.positions.map((position, i) => ({
    card: shuffled[i],
    position,
    isReversed: Math.random() < 0.3,
  }))
}
