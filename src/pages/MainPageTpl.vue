<template>
  <q-page class="flex flex-center column bg-primary">
    <q-card class="q-px-sm q-mb-md flex flex-center e-card-login">
      <div style="width:100%;" class="q-px-xl-lg">
        <div class="text-center m-mt-less text-primary">
          <h3>Magic Mail</h3>
        </div>
        <div class="space-pan-text text-grey-8 text-center q-pb-SM q-pb-xl-xl">
          <slot name="panel" class="space-pan-text"> </slot>
        </div>
        <div class="text-center q-pb-md q-pb-xl-xl">
          <slot name="title"> </slot>
        </div>
        <div style="width:60%;" class="q-mx-auto">
          <slot name="form"> </slot>
        </div>
        <div style="width:60%;" class="q-mx-auto">
          <slot class="text-center q-pb-md q-pb-xl-xl text-weight-thin" name="pass">
          </slot>
        </div>
      </div>
    </q-card>
    <div class="text-caption text-secondary"><slot name="version"> </slot></div>
  </q-page>
</template>

<style lang="scss" scoped>
.e-card-login {
  min-width: 330px;
  width: 25%;
  min-height: 336px;
  height: 69vh;
  border-radius: 30px;
}
.space-pan-text {
  word-spacing: 4px;
}
.m-mt-less {
  margin-top: -100px;
}
.m-bg-red {
  opacity: 50%;
}
</style>
