<template>
  <HomeAllTmpl>
    <template v-slot:title> </template>
    <template v-slot:card>
      <div class="flex flex-center row">
        <div @click="userC">
          <m-card size="30px" />
        </div>

        <div @click="userJ">
          <m-card
            color="bg-secondary"
            iconFondo="img/002-blocks.svg"
            description="Usuarios Juguetes"
          />
        </div>
        <div @click="userC">
          <m-card
            color="bg-accent"
            iconFondo="img/003-seo-report.svg"
            description="Pedidos"
          />
        </div>
        <div @click="userC">
          <m-card
            color="bg-positive"
            iconFondo="img/001-hand.svg"
            description="Pagos"
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
      this.$router.push({ name: 'usuariosClintes' }).catch(e => console.log(e));
    },
    userJ() {
      this.$router.push({ name: 'usuariosJuguetes' }).catch(e => console.log(e));
    },
  },
};
</script>
