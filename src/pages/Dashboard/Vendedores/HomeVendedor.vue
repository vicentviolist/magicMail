<template>
  <HomeAllTmpl>
    <template v-slot:title> </template>
    <template v-slot:card>
      <div class="flex flex-center row">
        <div @click="userC">
          <m-card
            description="Inventarios"
            iconFondo="img/inventarios.svg"
            color="bg-inventario"
          />
        </div>
        <div @click="pedidos">
          <m-card
            color="bg-accent"
            iconFondo="img/003-seo-report.svg"
            description="Pedidos"
          />
        </div>
        <div @click="repP">
          <m-card
            color="bg-perfil"
            iconFondo="img/programer.svg"
            description="Perfil"
          />
        </div>
      </div>
    </template>
  </HomeAllTmpl>
</template>

<script>
import HomeAllTmpl from 'src/pages/HomeAllTmpl.vue';

export default {
  name: 'main-page',
  components: {
    HomeAllTmpl,
  },
  data() {
    return {};
  },
  methods: {
    userC() {
      this.$router.push({ name: 'inventario' }).catch(e => console.log(e));
    },
    pedidos() {
      this.$router.push({ name: 'pedidos' }).catch(e => console.log(e));
    },
    repP() {
      this.$router.push({ name: 'user' }).catch(e => console.log(e));
    },
  },
};
</script>
