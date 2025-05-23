# 📝 Todo Summary Assistant

An AI-powered full-stack application that helps summarize pending todos in a motivational tone and sends them directly to a configured Slack channel.

---

## 📦 Contents

- ✅ Full-stack source code (Spring Boot + React)
- 🛠️ All configs via `application.properties` (no `.env` required)
- 🔌 Slack and LLM integration
- 📖 Setup instructions
- 🧱 Architecture & design overview

## ⚙️ Setup Instructions

### 🔧 Backend (Spring Boot - Java)

#### 📋 Prerequisites

- Java 17+
- Maven
- PostgreSQL installed and running

```properties
# --- Database ---
spring.datasource.url=jdbc:postgresql://localhost:5432/DB
spring.datasource.username=Your_DB_USERNAME
spring.datasource.password=Your_DB_PASSWORD

# --- Hibernate ---
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# --- OpenRouter LLM ---
openrouter.api.key=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
openrouter.model=gpt-3.5-turbo-instruct

# --- Slack ---
slack.webhook.url=https://hooks.slack.com/services/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



```
#### cd backend
./mvnw spring-boot:run

#### 🔧 Front End
- cd frontend
- npm install
- npm run dev

### Slack Integration

- Go to your Slack Workspace > Apps > Incoming Webhooks
- Create a new webhook, select a channel
- Copy the webhook URL
- Paste it into your application.properties

###  LLM Setup with OpenRouter

- Create a free account at https://openrouter.ai
- Go to API Keys and generate one
- Add the following in application.properties

### 🧱 Design & Architecture Decisions

#### 📁 Modular Structure

- backend/: Handles business logic, API, Slack, LLM
- frontend/: Handles UI, state, React Query, API integration

#### Lazy LLM Call

The LLM is only called when the "Summarize" button is clicked → optimized token usage and cost efficiency





### screent shots
![Screenshot 2025-05-23 121149](https://github.com/user-attachments/assets/32adab3b-70a5-43fa-8775-42895fde5654)
![Screenshot 2025-05-23 121140](https://github.com/user-attachments/assets/417576e2-67a7-4093-95f5-8bd52a750f36)
![Screenshot 2025-05-23 121131](https://github.com/user-attachments/assets/f79ad933-e7ed-4b32-8089-58656abc512f)

