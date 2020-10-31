# Startup Guide

## 개발하기

### 필수 프로그램 설치

- [Node.js Download](https://nodejs.org/en/download/)
- [Yarn Installation](https://yarnpkg.com/getting-started/install)

### mongodb 도커 설치

```bash
$ docker pull mongo
$ docker run -d  --name mongo-on-docker -p 27017:27017 mongo
```

### 프로젝트에 필요한 패키지들 설치

```bash
$ cd backend
$ yarn install
```

```bash
$ cd frontend
$ yarn install
```

### .env 파일 설정

```bash
$ cd backend
$ cp .env.example .env
```

이후 .env 파일 설정 적절하게 편집

**중요:** `JWT_SECRET` 은 반드시 적절한 난수로 바꾸어야 합니다.

### Development 모드로 실행

#### Backend

```bash
$ cd backend
$ yarn dev
```

#### Frontend

```bash
$ cd frontend
$ yarn serve
```

## 배포하기

### Frontend 빌드

```bash
$ cd frontend
$ yarn build
```

빌드 후, `frontend/dist` 디렉터리에 빌드된 frontend 파일이 생성됩니다.

### Backend 서버로 빌드된 Frontend 옮기기

```bash
$ cp -r frontend/dist backend/public
```

### Backend 서버 실행하기

```bash
$ yarn start
```
