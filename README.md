
# 📦 Content Recommendation Backend

A SaaS-based intelligent content recommendation platform built with **Node.js**, **Express**, **TypeScript**, **MongoDB**, and **TensorFlow.js**.  
This backend powers user interaction tracking, content management, and real-time AI-driven personalized recommendations.

---

## 🚀 Features

- 🔐 JWT-based authentication
- 📚 RESTful APIs for content CRUD
- 👣 User behavior tracking (views, likes, clicks, unlikes)
- 🧠 AI recommendation engine using TensorFlow.js (collaborative filtering)
- 📊 Analytics-ready structure
- 🐳 Dockerized and CI/CD enabled with GitHub Actions

---

## 🧰 Tech Stack

- **Node.js**, **Express**, **TypeScript**
- **MongoDB** with Mongoose
- **TensorFlow.js** for AI
- **Zod** for validation
- **Docker** for containerization
- **GitHub Actions** for CI/CD

---

## 📁 Project Structure

```
├── src/
│   ├── controllers/          # Route handlers
│   ├── middleware/           # Auth and validators
│   ├── models/               # Mongoose models
│   ├── routes/               # Express routers
│   ├── services/             # Business logic
│   ├── validation/           # Zod schemas
│   └── server.ts             # App entry point
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/content-recommendation-backend.git
cd content-recommendation-backend
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Configure Environment

Create a `.env` file using the example:

```bash
cp .env.example .env
```

Fill in:

```env
MONGO_URI=mongodb+srv://your-mongo-uri
JWT_SECRET=your-secret
PORT=4000
```

### 4. Run in Development

```bash
yarn dev
```

---

## 🐳 Docker Usage

### Dockerfile

```Dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build
ENV PORT=4000
EXPOSE 4000
CMD ["yarn", "start"]
```

### .dockerignore

```
node_modules
dist
.env
.git
*.log
```

### Build & Run Locally

```bash
docker build -t content-backend .
docker run -p 4000:4000 --env-file .env content-backend
```

### With Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "4000:4000"
    env_file:
      - .env
    restart: always
```

Run with:

```bash
docker-compose up
```

---

## ✅ API Endpoints

### Auth

- `POST /auth/register`
- `POST /auth/login`

### Content

- `POST /content`
- `GET /content`
- `GET /content/:id`
- `PUT /content/:id`
- `DELETE /content/:id`

### Interaction Tracking

- `POST /track` (view, like, unlike, click)

### Recommendations

- `GET /recommend` (requires JWT)

---

## 🧠 AI Recommendation Model

- Framework: `@tensorflow/tfjs-node`
- Model Type: **Collaborative Filtering** via neural network
- Input: user-content interaction matrix (binary)
- Excludes `"unlike"` from model training
- Output: predicted unseen content with relevance score
- Placeholder logic using random scores is used for now; can be upgraded to `model.predict(...)` in future.

---

## 🔁 GitHub Actions (CI/CD)

### File: `.github/workflows/deploy.yml`

```yaml
name: Deploy Backend

on:
  push:
    branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: yarn install

      - name: Build TypeScript
        run: yarn build

      - name: Run tests (optional)
        run: echo "No tests configured yet"

      - name: Docker login
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/saas-content-backend:latest
```

---

## 🔐 GitHub Secrets

| Secret Name       | Purpose                        |
|------------------|--------------------------------|
| `DOCKER_USERNAME`| Docker Hub username            |
| `DOCKER_PASSWORD`| Docker Hub password/token      |
| `MONGO_URI`      | MongoDB connection string      |
| `JWT_SECRET`     | JWT secret used for auth       |

---

## 📄 .env.example

```env
MONGO_URI=
JWT_SECRET=
PORT=4000
```

---

## ☁️ Deployment Options

- 🚀 **Render** (recommended — auto-deploy on push)
- ⚙️ **Railway** (PostgreSQL/MongoDB-friendly)
- ☁️ **AWS ECS / Elastic Beanstalk**
- 🐳 **Docker Hub + VPS**

---

## 📝 License

MIT

---

## 👨‍💻 Author

Made with ❤️ for a SaaS content recommendation platform assessment.
