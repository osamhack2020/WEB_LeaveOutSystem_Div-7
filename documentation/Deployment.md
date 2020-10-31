# 배포 가이드

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
