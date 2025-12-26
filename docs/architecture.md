# Архитектура Archie Health Dashboard

## Структура проекта

### Frontend
- index.html - главная страница dashboard
- css/styles.css - Tailwind + custom styles
- js/app.js - инициализация, routing
- js/health.js - CRUD для health data
- js/ai.js - интеграция с Jan.ai API
- js/ui.js - DOM manipulation

### Data Flow
1. User Input → Validation
2. Store in LocalStorage
3. Render UI
4. Update Charts

### AI Integration
- Endpoint: http://localhost:1337/v1/chat/completions
- Model: qwen3-8b-instruct
- System prompt: ветеринарный ассистент для Archie

### Deployment
- GitHub Pages (static site)
- Auto-deploy via GitHub Actions
