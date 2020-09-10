<template>
  <main-page-tpl>
    <template v-slot:title> {{ $t('gral.pages.logIn') }}</template>
    <template v-slot:form>
      <q-form @submit="handleAuth">
        <q-input
          dense
          class="q-mb-md"
          v-model="form.username"
          :label="$tc('user.label', 1)"
          lazy-rules
          :rules="[
            val =>
              (val && val.length > 0) ||
              $tc('user.label', 1) + $t('errors.fieldRequired'),
          ]"
        />
        <q-input
          dense
          class="q-mb-lg"
          v-model="form.password"
          :label="$t('user.password')"
          lazy-rules
          :rules="[
            val =>
              (val && val.length > 0) ||
              $t('user.password') + $t('errors.fieldRequired'),
          ]"
        />
        <q-btn
          :loading="loading"
          unelevated
          type="submit"
          class="q-mb-md full-width"
          color="primary"
          :label="$t('gral.pages.logIn')"
        >
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
      </q-form>
    </template>
  </main-page-tpl>
</template>

<script>
import MainPageTpl from './MainPageTpl';

export default {
  name: 'main-page',
  components: {
    MainPageTpl,
  },
  data() {
    return {
      loading: false,
      form: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    async handleAuth() {
      const { username, password } = this.form;
      this.loading = true;
      try {
        this.user = await this.$Auth.signIn(username, password);
        if (this.user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          //this.$router.push({ name: 'newPassword' });
        } else {
          this.$router.push({ name: 'dashboard' });
        }
      } catch (err) {
        if (err.code === 'UserNotConfirmedException') {
          this.showMsg('error', this.$t('errors.amplify.registerIncomplete'));
        } else if (err.code === 'PasswordResetRequiredException') {
          this.showMsg('error', this.$t('errors.amplify.passNotLongerValid'));
        } else if (
          err.code === 'NotAuthorizedException' ||
          err.code === 'UserNotFoundException'
        ) {
          if (err.message == 'Incorrect username or password.') {
            this.showMsg('error', this.$t('errors.amplify.invalidCredentials'));
          } else {
            this.showMsg('error', this.$t('errors.amplify.disableUser'));
          }
        } else {
          this.showMsg('error', err);
          // eslint-disable-next-line no-console
          console.log(err);
        }
      } finally {
        this.loading = false;
      }
    },
    goToRestorePass() {
      this.$router.push({ name: 'forgotPassword' });
    },
  },
};
</script>
