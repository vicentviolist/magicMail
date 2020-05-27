<template>
  <q-page class="flex flex-center bg-grey-9">
    <q-card class="q-py-lg q-px-md text-center" style="min-width:300px;">
      <div class="text-h6 q-my-md text-center">
        {{ $t('gral.pages.newPassword') }}
      </div>
      <div class="q-mb-md text-h7">
        {{ $t('gral.goback') }}
        <span class="text-primary cursor-pointer" @click="goToLogin">
          {{ $t('gral.pages.logIn') }}
        </span>
      </div>
      <q-form @submit="handleAuth">
        <q-input
          dense
          class="q-mb-md"
          v-model="form.user"
          :label="$tc('user.label', 1)"
        />
        <q-input
          dense
          class="q-mb-md"
          v-model="form.password"
          :label="$t('user.password')"
        />
        <q-btn unelevated type="submit" color="primary" :label="$t('gral.send')" />
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
      form: {
        user: null,
        password: null,
      },
    };
  },
  methods: {
    goToLogin() {
      this.$router.push({ name: 'login' });
    },
  },
};
</script>
