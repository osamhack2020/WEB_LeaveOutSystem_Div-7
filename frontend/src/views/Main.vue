<template>
  <div>
    <v-alert
      v-if="$store.getters.isAuthed && !$store.getters.user.division"
      type="warning"
    >
      현재 소속 부대가 없습니다. 부대 관리자에게 문의하여 소속을 변경하세요.
    </v-alert>
    <v-card color="grey lighten-3">
      <div class="head-entry">
        <h1 style="font-size:6em">
          출타관리체계에<br />
          오신 것을 환영합니다!
        </h1>
      </div>
    </v-card>

    <v-card color="grey lighten-2">
      <div class="odd-entry">
        <h1 style="font-size:4em">
          출타 관련 모든<br />
          업무를 한 곳에서
        </h1>
        <br />
        <p class="text-left" style="font-size:2em">
          수기 종합, 연대통합행정업무시스템, 국방인사정보체계에 분산되어 있던
          출타 관련 작업들을 단일 시스템에 통합하였습니다.
        </p>
      </div>
    </v-card>

    <v-card color="grey lighten-3">
      <div class="even-entry">
        <h1 style="font-size:4em">용사들도 출타를 <br />조회할 수 있는 체계</h1>
        <br />
        <p class="text-right" style="font-size:2em">
          용사들은 더 이상 본인의 출타를 정리하느라 머리를 앓을 필요가 없습니다!
          모든 출타 기록이 본 체계에 등록되어 있고 조회 가능합니다.
        </p>
      </div>
    </v-card>

    <v-card color="grey lighten-2">
      <div class="odd-entry">
        <h1 style="font-size:4em">
          간단하고 직관적인 <br />
          사용자 인터페이스
        </h1>
        <br />
        <p class="text-left" style="font-size:2em">
          출타관리체계로 출타를 신청하기 위해 특별히 배워야 할 것은 없습니다!
          간단하고 직관적인 UI로 누구나 쉽게 이용 가능합니다.
        </p>
      </div>
    </v-card>

    <v-card color="grey lighten-3">
      <div class="tail-entry">
        <h1 style="font-size:3em">
          지금 바로 출타를 신청해 보세요!
        </h1>
        <p style="font-size:2em">
          <router-link :to="{ path: '/myleave/leave-available' }" append
            >출타 신청하러 가기</router-link
          >
        </p>
      </div>
    </v-card>
  </div>
</template>
<style>
.odd-entry {
  padding-left: 3%;
  padding-top: 1.5%;
  padding-bottom: 1.5%;
  width: 50%;
  text-align: left;
}
.even-entry {
  padding-left: 47%;
  padding-right: 2.5%;
  padding-top: 1.5%;
  padding-bottom: 1.5%;
  text-align: right;
}
.head-entry {
  padding: 14%;
  text-align: center;
  height: 730px;
}
.tail-entry {
  padding: 5%;
  text-align: center;
  height: 250px;
}
</style>
