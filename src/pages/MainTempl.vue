<template>
  <q-page class="flex flex-center column">
    <slot name="back"></slot>
    <slot name="title" class="space-pan-text">
    </slot>
    <slot name="desc" class="space-pan-text">
    </slot>
    <slot name="card"> </slot>
    <slot name="table"> </slot>
    <div class="text-caption text-secondary"><slot name="version"> </slot></div>
  </q-page>
</template>

<style lang="scss" scoped>
.m-tex-m {
  margin-top: -1vw;
}
</style>
