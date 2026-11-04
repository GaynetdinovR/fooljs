# fooljs

**FoolJS** — интерактивная реализация карточной игры "Дурак" с продвинутым искусственным интеллектом. Проект
фокусируется на исследовании алгоритмов для игр с неполной информацией.

![Static Badge](https://img.shields.io/badge/status-in_process-yellow)
![Static Badge](https://img.shields.io/badge/progress-63%25-yellow)
![Static Badge](https://img.shields.io/badge/pet_project-purple)

## Содержание

- [Стек технологий](#stack)
- [Этапы разработки](#stages)
- [Планы развития](#plans)
- [Установка и запуск](#getting_started)
- [Симулятор партий](#simulator)
- [Тесты](#testing)
- [Технические возможности](#abilities)
- [Источники](#sources)
- [Демо](#demo)
- [Лицензия](#license)

## Стек технологий

<a id="stack"></a>

**Все технологии, которые были использованы в этом проекте:**

### **Frontend**

[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Zustand](https://img.shields.io/badge/zustand-%232653A8.svg?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)](https://sass-lang.com/)
[![Framer Motion](https://img.shields.io/badge/framer_motion-%23181818.svg?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

### **Инструменты**

[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)

## Этапы разработки

<a id="stages"></a>

| Этап                 | Вес  | Описание                     | Статус          | Детали                                                      |
|----------------------|------|------------------------------|-----------------|-------------------------------------------------------------|
| **Прототипирование** | 30%  | Базовый UI и механика        | ██████████ 100% | Базовая логика игры и интерфейс готовы                      |
| **Алгоритмы ИИ**     | 40%  | Реализация уровней сложности | █████░░░░░ 50%  | Random/Easy готовы, Medium в ablation-тестах, Hard в работе |
| **Симулятор партий** | 8%   | Тестирование эвристик и ИИ   | ██████████ 100% | Инструмент для настройки ИИ                                 |
| **Рефакторинг**      | 10%  | Исправление и улучшение кода | █████░░░░░ 50%  | Строгая типизация, SOLID, DRY, KISS                         |
| **Тестирование**     | 10%  | Unit и интеграционные тесты  | ░░░░░░░░░░ 0%   | Запланировано после завершения MVP                          |
| **Деплой**           | 2%   | Развертывание проекта        | ░░░░░░░░░░ 0%   | Заключительный этап                                         |

## Установка и запуск

<a id="getting_started"></a>

- Клонировать проект

```
git clone https://github.com/GaynetdinovR/fooljs.git
```

- Запустить

```
npm start
```

- Открыть в браузере

```
http://localhost:3000/
```
## Симулятор партий

<a id="simulator"></a>

Для калибровки сложности и проверки баланса в проект встроен высокопроизводительный симулятор партий (Bot vs Bot). Он позволяет отыгрывать тысячи матчей без участия человека и без рендера UI.

### **Запуск**

Все конфигурации (уровни сложности ИИ, количество карт в колоде, seed и т.д.) задаются в файле `sim/entry.ts.

- Чтобы запустить симуляцию, выполните в терминале:

```
npm run simulate
```

## Тесты

<a id="testing"></a>

- Запустить тесты

```
npm run test
```

## Технические особенности проекта

<a id="abilities"></a>

### **Технические возможности**

- [Single-page application (SPA)](https://en.wikipedia.org/wiki/Single-page_application)
- [Unit-testing](https://ru.wikipedia.org/wiki/%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5_%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)

### **Функционал и логика**

- **Кроссбраузерность** — поддержка Chrome, Firefox, Safari.
- **Настройка игры** — количество карт/режим/сложность ИИ
- **Проработанный UI** — уведомления и анимации
- **Игровая логика**
  - **Полная реализация правил** — подкидывание, атака, защита, взятие карт
  - **Валидация ходов** — нельзя сделать недопустимый ход
- **Сложный ИИ**
  - **Вероятностный расчёт** — оценка карт в руке противника
  - **Дерево исходов с отсечением** — поиск оптимальных ходов
  - **Анализ поведения игрока** — адаптация под стиль игры
  - **Фазовые стратегии** — разные алгоритмы для разных стадий партии
- **Симулятор партий** — Для калибровки сложности и проверки баланса в проект встроен высокопроизводительный симулятор партий.
  - **Seed-рандомизация** — все партии детерминированы (можно воспроизвести любой матч по seed).
  - **Mirrored-партии** — каждый матч играется дважды (ИИ А за Игрока 1, и ИИ А за Игрока 2) для устранения фактора удачи раздачи.
  - **Скорость** — **10 000 партий за ~20 секунд** (около 500 партий в секунду) благодаря оптимизированной логике без рендера.
  - **Статистика** — подсчёт винрейта и математической погрешности (margin of error) для точной настройки уровней сложности.


### **Принципы проектирования**

- **Чистая Layered Architecture** с разделением представления данных и ответственности:
  - Data layer — stores/ (хранилище данных).
  - Domain layer — core/ (правила, чистые методы без React).
  - Boundary layer — hooks/ (оркестровка).
  - Presentation layer — ui/ components/ (отрисовка).
- **Immutable state** — предсказуемость изменений
- **Declarative UI** — React с функциональными компонентами

## Планы развития

<a id="plans"></a>

| Задача                                        | Прогресс       |
|-----------------------------------------------|----------------|
| Добавить **анимации для карт(Framer Motion)** | █░░░░░░░░░ 10% |
| Оптимизировать по **LightHouse на 90+**       | ░░░░░░░░░░ 0%  |

## Источники

<a id="sources"></a>

## Демо

<a id="demo"></a>

*После деплоя здесь будет ссылка на демо*

## Лицензия

<a id="license"></a>
[![MIT License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
