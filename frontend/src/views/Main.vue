<template>
  <div>
    <v-alert
      v-if="$store.getters.isAuthed && !$store.getters.user.division"
      type="warning"
    >
      현재 소속 부대가 없습니다. 부대 관리자에게 문의하여 소속을 변경하세요.
    </v-alert>
    <v-card color="grey lighten-3">
      <div class="head-entry text-lg-h1 font-weight-bold" style="line-height:1.5em">
          출타관리체계에<br />
          오신 것을 환영합니다!
      </div>
    </v-card>

    <v-card color="grey lighten-2">
      <div class="odd-entry text-lg-h2 font-weight-bold" style="line-height:1.5em">
        
          출타 관련 모든<br />
          업무를 한 곳에서
      </div>
      <div class="odd-entry text-lg-h4" style="line-height:1.5em">
        수기 종합, 연대통합행정업무시스템, 국방인사정보체계에 분산되어 있던
          출타 관련 작업들을 단일 시스템에 통합하였습니다.
      </div>
    </v-card>

    <v-card color="grey lighten-3">
      <div class="even-entry text-lg-h2 font-weight-bold" style="line-height:1.5em">
          용사들도 출타를 <br />조회할 수 있는 체계
      </div>
      <div class="even-entry text-lg-h4" style="line-height:1.5em">
        용사들은 이제 본인의 출타 기록 정리로 머리를 앓을 필요가 없습니다!
          모든 출타 기록이 본 체계에 등록되어 있고 조회 가능합니다.
      </div>
    </v-card>

    <v-card color="grey lighten-2">
      <div class="odd-entry text-lg-h2 font-weight-bold" style="line-height:1.5em">
         간단하고 직관적인 <br />
          사용자 인터페이스
      </div>
      <div class="odd-entry text-lg-h4" style="line-height:1.5em">
        본 체계로 출타를 신청하기 위해 특별히 배워야 할 것은 없습니다!
          간단하고 직관적인 UI로 누구나 쉽게 이용 가능합니다.
      </div>
    </v-card>

    <v-card color="grey lighten-3">
      <div class="tail-entry text-lg-h3 font-weight-bold" style="line-height:1.5em">
          지금 바로 출타를 신청해 보세요! <br/>
          <router-link :to="{ path: '/myleave/leave-available' }" append class="text-lg-h4">출타 신청하러 가기</router-link>
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
  line-height: 1.5em;
}
.even-entry {
  padding-left: 47%;
  padding-right: 2.5%;
  padding-top: 1.5%;
  padding-bottom: 1.5%;
  text-align: right;
  line-height: 1.5em;
}
.head-entry {
  padding: 14%;
  text-align: center;
  height: 730px;
  line-height: 1.5em;
}
.tail-entry {
  padding: 5%;
  text-align: center;
  height: 250px;
  line-height: 1.5em;
}

</style>
