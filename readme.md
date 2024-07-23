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

if docker-compose throwing error then try: `docker-compose down` before `docker-compose up`

Access webapp at: localhost:5173
```

## Preview
![image](https://github.com/user-attachments/assets/8d43bf98-348f-44bb-977f-63b59f551f15)
![image](https://github.com/user-attachments/assets/6901cb95-7e4f-4b0d-8ba9-f973bf529e89)
