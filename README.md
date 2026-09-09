# fooljs

**FoolJS** — интерактивная реализация карточной игры "Дурак" с продвинутым искусственным интеллектом. Проект
фокусируется на исследовании алгоритмов для игр с неполной информацией.

![Static Badge](https://img.shields.io/badge/status-in_process-yellow)
![Static Badge](https://img.shields.io/badge/progress-35%25-orange)
![Static Badge](https://img.shields.io/badge/pet_project-purple)

## Содержание

- [Стек технологий](#stack)
- [Этапы разработки](#stages)
- [Планы развития](#plans)
- [Установка и запуск](#getting_started)
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

| Этап                 | Описание                     | Статус         | Детали                                    |
|----------------------|------------------------------|----------------|-------------------------------------------|
| **Прототипирование** | Базовый UI и механика        | █████████░ 90% | Базовая логика игры закончена             |
| **Алгоритмы ИИ**     | Реализация уровней сложности | ████░░░░░░ 40% | Easy/Normal готовы, Hard/Extreme в работе |
| **Тестирование**     | Unit и интеграционные тесты  | ░░░░░░░░░░ 0%  | Запланировано после MVP                   |
| **Рефакторинг**      | Исправление и улучшение кода | ░░░░░░░░░░ 0%  | Запланировано после MVP                   |
| **Деплой**           | Развертывание проекта        | ░░░░░░░░░░ 0%  | Заключительный этап                       |

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

### **Принципы проектирования**

- **Чистая архитектура** — разделение ответственности
- **Dependency Injection** — лёгкое тестирование и замена компонентов
- **Immutable state** — предсказуемость изменений
- **Declarative UI** — React с функциональными компонентами

## Планы развития

<a id="plans"></a>

| Задача                                        | Прогресс       |
|-----------------------------------------------|----------------|
| Добавить **анимации для карт(Framer Motion)** | █░░░░░░░░░ 10% |
| Оптимизировать по **LightHouse на 90+**       | ░░░░░░░░░░ 0%  |
| Добавить другие **варианты игры**             | ░░░░░░░░░░ 0%  |

## Источники

<a id="sources"></a>

## Демо

<a id="demo"></a>

*После деплоя здесь будет ссылка на демо*

## Лицензия

<a id="license"></a>
[![MIT License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
