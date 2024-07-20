# Price Tracker

## Setup

```
clone repo
cd price-tracker
```

### Without docker

#### Backend

```
cd backend
npm install
environment variables to set: MONGO_URI, COINWATCH_API_KEY
npm run start:dev
```

#### Frontend

```
cd frontend
npm install
environment variables to set: API_SERVER
npm run dev

Access webapp at: localhost:5173
```


### With Docker

```
docker-compose up

Access webapp at: localhost:5173
```
