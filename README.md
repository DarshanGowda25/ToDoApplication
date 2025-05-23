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
spring.datasource.username=DB_USERNAME
spring.datasource.password=_DB_PASSWORD

# --- Hibernate ---
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# --- OpenRouter LLM ---
openrouter.api.key=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
openrouter.model=gpt-3.5-turbo-instruct

# --- Slack ---
slack.webhook.url=https://hooks.slack.com/services/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


cd backend
./mvnw spring-boot:run
```

### 🔧 Front End
cd frontend
npm install
npm run dev

### Slack Integration

1.Go to your Slack Workspace > Apps > Incoming Webhooks
2.Create a new webhook, select a channel
3.Copy the webhook URL
4.Paste it into your application.properties

###  LLM Setup with OpenRouter

1.Create a free account at https://openrouter.ai
2.Go to API Keys and generate one
3.Add the following in application.properties

The LLM is only called when the "Summarize" button is clicked → optimized token usage and cost efficiency

### screent shots
![Screenshot 2025-05-23 121149](https://github.com/user-attachments/assets/32adab3b-70a5-43fa-8775-42895fde5654)

