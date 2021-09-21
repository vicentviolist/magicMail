<template>
  <div class="text-center q-ma-lg">
    <div class="m-card flex flex-center cursor-pointer" :class="[color, isMini ? 'm-card-mini' : 'm-card']">
      <img :src="iconFondo" alt="" />
    </div>
    <div class="q-mt-md">{{ description }}</div>
  </div>
</template>
<script>
export default {
  name: 'm-card',
  data() {
    return {
    };
  },
  props: {
    description: {
      type: String,
      default: 'Usuarios Clientes',
    },
    color: {
      type: String,
      default: 'bg-primary',
    },
    isMini: {
      type: Boolean,
      default: false,
    },
    iconFondo: {
      type: String,
      default: 'img/family.svg',
    },
  },
  computed: {},
  methods: {},
};
</script>
<style lang="scss">
.m-card {
  height: 200px;
  width: 200px;
  border-radius: 30px;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.2);
}
.m-card:hover {
  box-shadow: 4px 4px 8px 4px rgba(0, 0, 0, 0.2);
  transition: all ease 0.3s;
}
.m-card-mini {
  height: 70px;
  width: 70px;
  border-radius: 20px;
  box-shadow: 2px 2px 8px 2px rgba(0, 0, 0, 0.2);
}
</style>
