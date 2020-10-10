<template>
  <div>
    <v-alert
      v-if="$store.getters.isAuthed && !$store.getters.user.division"
      type="warning"
    >
      현재 소속 부대가 없습니다. 부대 관리자에게 문의하여 소속을 변경하세요.
    </v-alert>
    <div>main page</div>
  </div>
</template>
