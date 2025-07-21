## Документация по проекту "Список контактов". В ней отражены реальные промпты, этапы, решения и инструменты, использованные в процессе разработки.

# Документация по проекту "Список контактов"

## 1. Основные промпты к ИИ

В ходе работы над проектом я активно использовал ИИ-агентов (Perplexity, Gemini, Cline, Goose) для генерации кода, проектирования архитектуры и уточнения технических деталей. Привожу ключевые промпты, которые реально применялись на разных этапах:

### 1.1. Проектирование и требования

**Промпт (Perplexity, июнь 2025):**

```
You are an expert prompt engineer tasked with architecting the most effective, efficient, and contextually aware prompts for large language models (LLMs). For every task, your goal is to:

– Extract the user’s core intent and reframe it as a clear, targeted prompt.
– Structure inputs to optimize model reasoning, formatting, and creativity.
– Anticipate ambiguities and preemptively clarify edge cases.
– Incorporate relevant domain-specific terminology, constraints, and examples.
– Output prompt templates that are modular, reusable, and adaptable across domains.

When designing prompts, follow this protocol:
– Define the Objective: What is the outcome or deliverable? Be unambiguous.
– Understand the Domain: Use contextual cues (e.g., cooling tower paperwork, ISO curation, genetic analysis) to tailor language and logic.
– Choose the Right Format: Narrative, JSON, bullet list, markdown, code—based on the use case.
– Inject Constraints: Word limits, tone, persona, structure (e.g., headers for documents).
– Build Examples: Use “few-shot” learning by embedding examples if needed.
– Simulate a Test Run: Predict how the LLM will respond. Refine.

Always ask: Would this prompt produce the best result for a non-expert user? If not, revise.

You are now the Prompt Architect. Go beyond instruction — design interactions.

==================

На основе требований из тестового задания, напиши промпт для создания приложения Список контактов (имя, телефон, email, компания).
Использовать следующие инструменты:
- SvelteKit
- Svelte UI — стилизация
- Svelte UI — готовые компоненты для Svelte

Промпт должен быть адаптирован для агента VS Code Cline.
Промпт должен содержать подробные инструкции для разработки архитектуры приложения с учетом всех требований из ТЗ.
Промпт должен быть готовым, то есть скопировал и вставил в Cline в чат в режиме Plan.
```

---

### 1.2. Технические спецификации

**Промпт (Perplexity, июнь 2025):**

```
Опиши технические спецификации для приложения "Список контактов" на SvelteKit + TypeScript + Tailwind + Dexie. Укажи архитектуру, структуру папок, интерфейсы, список компонентов и ограничения по пакетам.
```

Использован для:
[02-tech-specs.md](/contacts_app/.clinerules/02-tech-specs.md)

---

### 1.3. Генерация структуры данных

**Промпт:**

```
Опиши структуру данных контакта с TypeScript-интерфейсом для хранения в Dexie (IndexDB). Поля: id, name, phone, email, address, createdAt, updatedAt.
```

Использован для:
[contactsDB.ts](/contacts_app/src/lib/db/contactsDB.ts)

---

### 1.4. Генерация компонентов

**Промпт:**

```
Сгенерируй компонент Svelte для формы добавления и редактирования контакта. Используй Tailwind CSS для стилизации. Форма должна содержать поля: имя, телефон, email, адрес.
```

Использован для:
[ContactForm.svelte](/contacts_app/src/lib/components/ContactForm.svelte),
[EditContactModal.svelte](/contacts_app/src/lib/components/EditContactModal.svelte)

---

### 1.5. Генерация списка и поиска

**Промпт:**

```
Напиши компонент Svelte для отображения списка контактов с возможностью поиска по имени, телефону или email. Используй liveQuery из Dexie для реактивного обновления данных.
```

Использован для:
[ContactList.svelte](/contacts_app/src/lib/components/ContactList.svelte),
[SearchBar.svelte](/contacts_app/src/lib/components/SearchBar.svelte)

---

### 1.6. Генерация package.json (смена тактики)

**Промпт (Cline, июнь 2025):**

```
создай мне package json, который будет работать на последней версии svelte и vite (Это главное). вместо flowbite-svelte использовать svelte ui. Все остальные пакеты подогнать под базу выше
```

Использован для:
[package.json](/contacts_app/package.json)

---

## 2. Время, затраченное на каждый этап

| Этап                                       | Время (часы) | Описание                                                                                 |
| :----------------------------------------- | :----------- | :--------------------------------------------------------------------------------------- |
| Анализ требований и проектирование         | 0.9          | Формализация требований, генерация ТЗ и спецификаций с помощью Perplexity и Goose        |
| Настройка окружения и scaffold проекта     | 0.45         | Генерация package.json, установка зависимостей, настройка SvelteKit, Svelte UI, Tailwind |
| Разработка основных компонентов            | 1.8          | Генерация и доработка ContactForm, ContactList, SearchBar, Overlay, интеграция с Dexie   |
| Интеграция IndexDB через Dexie             | 0.45         | Реализация и тестирование локального хранилища                                           |
| Стилизация и адаптивность                  | 0.45         | Использование Tailwind CSS и Svelte UI для responsive-дизайна                            |
| Тестирование, багфикс, финальная полировка | 0.45         | Проверка UX, исправление багов, финальные правки                                         |
| **Итого**                                  | **4.5**      |                                                                                          |

---

## 3. Основные решения и их обоснование

### 3.1. Декомпозиция задач и пошаговая генерация

- **Обоснование:**
  Опыт показал, что LLM-агенты (Cline, Perplexity) эффективнее работают с конкретными, атомарными задачами. Поэтому проект был разбит на отдельные этапы: scaffold, архитектура, компоненты, стилизация.

### 3.2. Выбор стека: SvelteKit + TypeScript + Svelte UI + Tailwind + Dexie

- **Обоснование:**
  SvelteKit — современный фреймворк для SPA/SSR, TypeScript — строгая типизация, Svelte UI — готовые компоненты, Tailwind — быстрая стилизация, Dexie — удобная работа с IndexDB.

### 3.3. Локальное хранение данных через IndexDB (Dexie)

- **Обоснование:**
  Для оффлайн-режима и приватности пользовательских данных. Dexie предоставляет простой и реактивный API.

### 3.4. Модульная архитектура компонентов

- **Обоснование:**
  Каждый UI-элемент вынесен в отдельный компонент для переиспользуемости и тестируемости.

### 3.5. Использование liveQuery для реактивности

- **Обоснование:**
  Позволяет автоматически обновлять список контактов при изменениях в базе, улучшая UX.

### 3.6. Интеграция и смена тактики генерации

- **Обоснование:**
  Первый универсальный промпт для Cline не дал нужного результата (слишком абстрактно). Было принято решение перейти к генерации конкретных файлов (package.json, компоненты) отдельными промптами.

---

## 4. Инструменты, использованные в работе

- **Perplexity** — генерация ТЗ, спецификаций, уточнение технических вопросов
- **Gemini** — генерация и уточнение промптов, тестирование кода
- **Cline (OpenRouter)** — генерация кода и scaffold-проектов в VS Code
- **Goose** — хранение заметок, анализ промптов, фиксация хода работы

---
