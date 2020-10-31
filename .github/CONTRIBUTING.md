# 출타관리체계 기여 가이드

출타관리체계에 기여하려는 모든 분들, 환영합니다!

시작하기 전에 [기여자 행동 강령 규약](CODE_OF_CONDUCT)에 대해 읽어보시길 바랍니다.

## Issue

기능제안, 버그, 불만사항 어떤것이든 괜찮습니다! 편하게 이슈를 제안해주세요.
[이슈 템플릿](https://github.com/osamhack2020/WEB_LeaveOutSystem_Div-7/tree/master/.github/ISSUE_TEMPLATE)을 참고해 이슈를 만들면 됩니다..

## Pull Request

- master 브랜치에는 항상 바로 사용 가능한 안정된 버전이 올라와 있어야합니다. Pull Request 하기 전 완성된 코드인지 확인해야 합니다.
- 한 기능 단위당 한 Pull Request 여야 합니다.
- `yarn lint` 명령으로 lint 되어있는 코드여야합니다.
- 기능을 추가할 땐, 파일 구조가 다른 파일들과 조화로워야 합니다.
- [Pull Request 템플릿](https://github.com/osamhack2020/WEB_LeaveOutSystem_Div-7/blob/master/.github/pull_request_template.md) 을 참고하세요.

## API 문서

백엔드에 사용된 API가 문서화되어 있습니다.
[출타관리체계 REST API 문서](/documentation/API.md)를 참고하세요.

## 빠른 개발환경 세팅

1. `node.js`, `yarn`, `docker`, `git` 를 설치
2. `$ git clone https://github.com/osamhack2020/WEB_LeaveOutSystem_Div-7` 명령으로 리포지토리를 클론
3. `/utils` 디렉토리에서 `$ . setup.sh` 명령을 실행
4. `backend` 디렉토리의 .env 파일의 설정을 변경

## 자세한 개발 환경 세팅

시작하기 전, [Node.js v12](https://nodejs.org/en/download/) 이상과 와 [Yarn](https://yarnpkg.com/getting-started/install) 이 필수로 설치되어 있어야 합니다.

### 프로젝트에 필요한 패키지들 설치

프로젝트를 Clone 한 후에는 프로젝트에서 사용되는 패키지들을 다음 명령어로 설치해야합니다.

```bash
$ cd backend
$ yarn install
```

```bash
$ cd frontend
$ yarn install
```

### mongodb 도커 설치

데이터베이스로 [MongoDB](https://www.mongodb.com/)가 필요합니다. 다양한 방법으로 설치 할 수 있지만 Linux 환경이고 [Docker](https://www.docker.com/)를 사용할 수 있다면, 다음 명령어로 MongoDB를 바로 사용할 수 있습니다.

```bash
$ docker pull mongo
$ docker run -d  --name mongo-on-docker -p 27017:27017 mongo
```

### .env 파일 설정

Backend에서 사용하는 환경변수 사전 설정 파일인 .env 파일을 생성해야 합니다. 다음 명령어로 예시 .env 파일을 가져와서 수정하면 됩니다.

**중요:** `JWT_SECRET` 은 반드시 적절한 난수로 바꾸어야 합니다.

```bash
$ cd backend
$ cp .env.example .env
```

### Development 모드로 실행

개발 모드로 실행하려면 Backend 와 Frontend 를 따로따로 실행해야합니다.

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

### 유의사항

초기 어드민계정 정보는 다음과 같습니다.

```
username: admin
password: 12345
```

실제 배포시에는 비밀번호를 변경하는것을 추천합니다.

## 배포

[배포 가이드](/documentation/Deployment)를 참고하세요.

## 프로젝트 구조

```
├── backend                   // 백엔드 디렉터리
│   ├── app
│   │   ├── controllers       // route 구현 코드
│   │   ├── middleware        // route helper 코드
│   │   ├── models            // DB 모델 정의
│   │   └── routes            // route 정의
│   ├── config
│   ├── data                  // 초기 설정된
│   ├── public                // 빌드된 frontend 위치
│   ├── test
│   └── views
├── frontend                  // 프론트엔드 디렉터리
│   ├── public
│   └── src
│       ├── assets
│       ├── components        // 컴포넌트
│       │   ├── core          // 공통으로 사용되는 컴포넌트
│       │   └── myleave       // 내 출타 페이지의 컴포넌트
│       ├── plugins
│       ├── router
│       │   └── routes        // 페이지 route 정의
│       ├── services          // API helper 코드
│       ├── store             // Vuex 상태 코드
│       │   └── modules
│       ├── utils
│       └── views             // 페이지
│           └── MyLeave       // 내 출타 페이지
```

## 코딩 스타일

코딩 스타일 규칙은 Backend와 Frontend에 정의되어있는 ESLint 설정과 Prettier 설정을 베이스로 합니다. 해당 파일은 `.eslintrc.js` 와 `.prettierrc.js` 입니다.

프론트엔드와 백엔드 모두에서 `yarn lint` 명령을 실행하면 코딩 스타일 문제를 확인할 수 있습니다.

### 일반 규칙

- 큰따옴표 대신 작은 따옴표 사용하기
- 익명 함수는 화살표 함수 문법 사용하기
- Promise 보다 async await 문법 사용하기
- 가능한 `var` 키워드를 피하고 `let`, `const` 키워드 사용하기
- 비교할 때 엄격한 비교 (`===`) 사용하기

### Backend 규칙

- camelCase를 사용하되, DB 모델은 PascalCase를 사용하기

### Frontend 규칙

- Single File Component 는 template - style - script 순서를 유지하기
- 컴포넌트 이름은 PascalCase를 사용하고, 서비스 모듈들은 camelCase를 사용하기
