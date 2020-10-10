# 출타관리체계
출타 정보와 출타 업무 기능들을 한 곳에 모아 관리하여 행정 부담을 완화하고,<br/>
개인의 출타 정보를 조회할 수 있게 하여 용사들의 출타 계획 수립을 돕는 서비스



## 프로젝트 소개


**기존 출타 종합 과정의 문제점**

1. 행정적 문제점
 - *수기*로 출타 계획 종합, *엑셀* 파일로 정리 후 *연대 통합행정업무 시스템*과<br/>*국방인사정보체계*를 이용해 계원이 출타를 신청하고 승인받아 휴가증을 발급해 줌.
 - 용사들의 출타(외출, 외박, 휴가)는 매우 자주 있는 활동임에도, <br/>출타 정보와 출타 업무 기능들이 다양한 곳에 분산되어 있어 행정적 손실이 큼.

2. 용사들이 겪는 어려움
 - 용사들이 잔여 출타를 조회할 수 있는 시스템의 부재.
 - 특히 포상 휴가의 만료 기간을 정확히 몰라, 휴가 계획 수립 시 <br/>어떤 휴가를 먼저 써야 할지 고민하며 발생하는 불필요한 정신적 소모가 큼.

### 

**출타통합관리체계**는 현 시스템의 위 문제점들을 보완하여,

출타 관련 모든 **기능**들을 **한 곳에서** 수행할 수 있고,<br/> 
출타 관련 모든 **정보**들을 **한 곳에서** 조회할 수 있는

통합 출타 관리 시스템이다.


## 기능 설계
**[Oven](https://ovenapp.io/view/PCf6ZCxAgq8ROY5VMIlacoo4sQgquEBH/Pnctr)**

## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)
* ECMAScript 6 지원 브라우저 사용
* 권장: Google Chrome 버젼 77 이상

## 기술 스택 (Technique Used)
### Server(back-end)
 - Node.js + Express
 - MongoDB

### front-end
 - Vue.js

## 설치 안내 (Installation Process)
 - Nodejs, yarn, docker와 git 설치 후 다음 명령들을 실행
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
