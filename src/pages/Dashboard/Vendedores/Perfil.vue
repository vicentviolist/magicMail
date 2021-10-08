<template>
  <MainTempl>
    <template v-slot:back>
      <div class="flex justify-start absolute-top full-width" @click="back()">
        <q-btn
          flat
          no-caps
          label="Regresar"
          icon="arrow_back_ios"
          class="q-ml-sm text-weight-light"
        />
      </div>
    </template>
    <template v-slot:title>
      <div class="row flex flex-center">
        <m-card
          isMini
          color="bg-perfil"
          isCustom
          iconFondo="img/programer.svg"
          description=""
        />
        <div class="text-h4 m-y-auto">Perfil</div>
      </div>
    </template>
    <template v-slot:desc>
      <h6 style="width:40%">
        Hola {{ name }} En esta sección podras editar tu perfil!
      </h6>
    </template>
    <template v-slot:table>
      <div class="q-mt-xl flex" style="width:70%">
        <div class="q-mr-xl">
          <div class="flex q-mt-lg">
            <div>
              Email: <strong> {{ nombre }}</strong>
            </div>
          </div>
          <div class="flex q-mt-lg">
            <div>
              Nombre: <strong>{{ name }}</strong>
            </div>
          </div>
          <div class="flex q-mt-lg">
            <div><strong>Contraseña</strong></div>
          </div>
        </div>
        <div class="q-ml-xl">
          <div class="flex q-mt-lg">
            <div><strong>¿Deseas configurar tu perfil?</strong></div>
            <q-btn
              rounded
              label="Confiruración"
              class="q-ml-xl"
              @click="alert = true"
              color="primary"
            ></q-btn>
          </div>
        </div>
        <q-dialog v-model="alert">
          <q-card class="m-modal">
            <q-card-section>
              <div class="flex flex-center justify-between  q-mx-lg">
                <div class="text-h6">Perfil de configuración</div>

                <q-btn
                  flat
                  @click="alert = false"
                  class="q-ml-xl"
                  rounded
                  color="primary"
                  label="cancelar"
                />
              </div>
            </q-card-section>

            <q-card-section class="q-pt-lg flex flex-center">
              <div class="" style="width:70%">
                <m-input filled class="q-mb-lg" v-model="name" label="NOMBRE">
                </m-input>
                <m-input
                  filled
                  class="q-mb-lg"
                  v-model="email"
                  label="CORREO ELECTRONICO"
                >
                </m-input>
                <q-btn
                  @click="modalChange"
                  class="q-ml-xl"
                  rounded
                  color="primary"
                  label="Cambiar contraseña"
                />
              </div>
            </q-card-section>

            <q-card-actions align="right" class="q-mb-xl">
              <q-btn
                rounded
                label="Editar"
                class="q-mr-xl"
                color="primary"
                @click="editar"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="alert2">
          <q-card class="m-modal">
            <q-card-section>
              <div class="flex flex-center justify-between  q-mx-lg">
                <q-btn
                  flat
                  @click="alert2 = false"
                  class="q-ml-xl"
                  rounded
                  color="primary"
                  label="cancelar"
                />
              </div>
            </q-card-section>

            <q-card-section class="q-pt-lg flex flex-center">
              <div class="" style="width:70%">
                <div class="q-mb-xl">
                  Obten enlace para restablecer, revisa tu correo
                </div>
                <m-input
                  filled
                  class="q-mb-lg"
                  v-model="email"
                  label="CORREO ELECTRONICO"
                >
                </m-input>
              </div>
            </q-card-section>

            <q-card-actions align="right" class="q-mb-xl">
              <q-btn
                rounded
                label="Recuperar"
                class="q-mr-xl"
                color="primary"
                @click="passwordReset"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </template>
  </MainTempl>
</template>

<script>
import MainTempl from 'src/pages/MainTempl.vue';
import Parse from 'parse';

export default {
  name: 'main-page',
  components: {
    MainTempl,
  },
  data() {
    return {
      loading: false,
      alert: false,
      alert2: false,
      identificador: null,
      email: null,
      nombre: null,
      name: null,
    };
  },
  created() {
    this.pruebas();
  },
  methods: {
    back() {
      this.$router.push({ name: 'vendedor' }).catch(e => console.log(e));
    },
    chagePassword() {
      this.$router.push({ name: 'vendedor' }).catch(e => console.log(e));
    },
    async editar() {
      let user = Parse.User.current();
      let username = this.name;
      let email = this.email;
      user
        .save({
          email: email,
          username: username,
        })
        .then(
          user => {
            this.showMsg('ok', 'Editado');
          },
          error => {
            this.showMsg('ok', error);
          },
        );
      this.alert = false;
    },
    pruebas() {
      let user = Parse.User.current();
      let name = user.get('username');
      let nombre = user.get('nombre');
      let email = user.get('email');
      if (user) {
        this.email = email;
        this.nombre = email;
        this.name = name;
      } else {
      }
    },
    modalChange() {
      this.alert = false;
      this.alert2 = true;
    },
    passwordReset() {
      let email = this.email;
      Parse.User.requestPasswordReset(email)
        .then(() => {
          this.showMsg('ok', 'Correo enviado, revisa tu correo y inica sesión');
        })
        .catch(error => {
          this.showMsg('Error: ' + error.code + ' ' + error.message);
        });
    },
  },
};
</script>
