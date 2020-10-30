<p align="center"><img src="LeaveOut-logo.png"></p>

출타 신청시의 *소통의 어려움*과 *작업의 불편함*을 해결하는 **자동화된 시스템**

### 시연영상 [![Youtube Badge](https://img.shields.io/badge/Youtube-ff0000?style=flat-square&logo=youtube&link=https://youtu.be/Hc-uen8y0mc)](https://youtu.be/Hc-uen8y0mc) 

## 프로젝트 소개

**기존 출타 종합 과정의 문제점**

1. 출타 종합 시마다 비효율적인 반복 작업을 수행

- 2020년에 손으로 써서 신청하고 엑셀로 정리하여 종합합니다. 계원 1명이 중대용사 100명분을!

2. 용사 본인이 보유한 출타를 확인할 수 없음

- 본인도, 계원도, 중대장도 휴가가 정확히 얼마나 있는지 모릅니다!

3. 출타 승인 여부를 확인할 수 없음

- 신청한 휴가가 혹시 잘렸는지 모두가 하루 세네번씩 계원에게 물어봅니다!

**새로운 출타관리체계를 사용하면...**

1. 엑셀 노가다는 그만

- 출타 부여, 신청, 승인 등 모든 작업이 자동화된 체계 내에서 동작합니다!

2. 계원 찾아 삼만리도 그만

- 로그인 한 번에 보유한 출타, 출타 신청 현황, 승인 여부 등 모든 정보를 확인 가능합니다!

3. 언제 어디서나 나의 출타계획 도우미와 함께

- 휴가조합 추천 AI와 출타 통계 기능을 통해 많은 출타 고민들을 용사 대신 해줍니다!

## 기능 설계

**[Oven](https://ovenapp.io/view/PCf6ZCxAgq8ROY5VMIlacoo4sQgquEBH/Pnctr)**

#### 페이지 구성

- **대시보드 페이지**
  - 본인의 출타에 관한 모든 정보가 요약되어 한 화면에 표시됩니다. 대시보드는 다음의 5개 영역으로 구성되어 있습니다.
    - 보유한 출타: 본인의 잔여 출타들이 종류별로 분류되어 보유 출타 일수가 표시됩니다.
    - 출타신청 진행 현황: 본인이 신청한 출타들의 상태(승인/거부/대기)가 상태별로 분류되어 그 개수가 표시됩니다.
    - 출타 히스토리: 본인이 과거에 나간 모든 출타들의 목록이 요약되어 표시됩니다.
    - 내 달력: 본인이 과거에 나간 출타들, 신청 후 승인된 그리고 대기중인 예정된 출타들이 달력에 표시됩니다.
    - 출타율 그래프: 내 달력과 연동되어, 최근 2개월의 날짜별 출타율 정보가 꺾은선 그래프로 표시됩니다. 용사들이 출타를 신청시 언제 출타를 나갈 수 있을지 예측할 때 유용합니다.

- **출타신청 페이지**
  - 대시보드의 '보유한 출타' 영역 우측 하단의 자세히 보기 버튼을 클릭하면 표시됩니다.
  - 사용하려는 출타들을 선택하고, 달력에서 출발일을 선택하고 신청하기 버튼을 클릭하면 출타가 신청됩니다.
  - 만료일과 출타길이를 기반으로 조합별 점수를 매겨 최상의 휴가 조합 3개를 추천해주는 **휴가 추천 시스템**을 이용해 출타일수만 결정하면 더 이상의 고민 없이 즉시 신청 가능합니다.

- **출타신청 현황 조회 페이지**
  - 대시보드의 '출타신청 현황' 영역 우측 하단의 자세히 보기 버튼을 클릭하면 표시됩니다.
  - 본인이 신청한 출타들의 상태가 상태별로(승인/거부/대기) 분류되어 조회됩니다.


## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)

Frontend Browser 조건:

- ECMAScript 6 지원 브라우저 사용
- 권장: Google Chrome 버젼 77 이상

Backend Server 조건:

- Node v12.13.0 이상

## 기술 스택 (Technique Used)

### Backend Server

- [Node.js](https://nodejs.org) + [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Frontend

- [Vue.js](https://vuejs.org/)
- [Vuetify.js](https://vuetifyjs.com/)

## 설치 안내 (Installation Process)

- `Node.js`, `yarn`, `docker`와 `git` 설치 후 다음 명령들을 실행

```bash
$ git clone https://github.com/osamhack2020/WEB_LeaveOutSystem_Div-7
$ cd util
$ ./setup.sh
```

## 프로젝트 사용법 (Getting Started)

```bash
$ cd util
$ ./runBack.sh & ./runFront.sh
```

## 팀 정보 (Team Information)

박건영 (tekiter8@gmail.com)<br>
<a href="https://github.com/Tekiter"><img src="https://img.shields.io/badge/Github-Tekiter-green?style=flat&logo=github" alt="Tekiter"></a>

백도원 (bkdo1006@naver.com)<br>
<a href="https://github.com/ask-to-answer"><img src="https://img.shields.io/badge/Github-ask--to--answer-green?style=flat&logo=github" alt="ask-to-answer"></a>

## 저작권 및 사용권 정보 (Copyleft / End User License)

<a href="LICENSE.md"><img src="https://img.shields.io/github/license/osamhack2020/WEB_LeaveOutSystem_Div-7?label=%EB%9D%BC%EC%9D%B4%EC%84%A0%EC%8A%A4" alt="License"></a>
