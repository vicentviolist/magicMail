<template>
  <HomeAllTmpl>
    <template v-slot:title
      ><div class="text-h3 m-tex-m">
        Bienvenido
      </div>
      <p class="q-mb-xl">
        Administración aquí podras manejar tu lista de clientes así como ver el
        detalle de tus pedidos.
      </p>
    </template>
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
        <div @click="repP">
          <m-card
            color="bg-accent"
            iconFondo="img/003-seo-report.svg"
            description="Pedidos"
          />
        </div>
        <div @click="repPagos">
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
    repP() {
      this.$router.push({ name: 'reportePedidos' }).catch(e => console.log(e));
    },
    repPagos() {
      this.$router.push({ name: 'reportePagos' }).catch(e => console.log(e));
    },
  },
};
</script>
