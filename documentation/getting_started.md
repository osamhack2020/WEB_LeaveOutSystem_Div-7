# 개발환경 구성

### 프로젝트에 필요한 패키지들 설치
```
cd backend
yarn install
```

```
cd frontend
yarn install
```

### mongodb 도커 설치
```
docker pull mongo
docker run -d  --name mongo-on-docker  -p 27017:27017 mongo
```

### .env 파일 설정
```
cd backend
cp .env.example .env
```

# 개발시 참고
backend: [node-express-mongodb-jwt-rest-api-skeleton](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton)

