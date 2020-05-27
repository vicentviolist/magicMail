<template>
  <q-page class="flex flex-center bg-grey-9">
    <q-card class="q-py-lg q-px-md text-center" style="min-width:300px;">
      <div class="text-h6 q-my-md text-center">
        {{ $t('gral.pages.logIn') }}
      </div>
      <q-form @submit="handleAuth">
        <q-input
          dense
          class="q-mb-md"
          v-model="form.user"
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
          unelevated
          type="submit"
          class="q-mb-md"
          color="primary"
          :label="$t('gral.pages.logIn')"
        />
      </q-form>
      <div class="q-mt-sm text-h7">
        {{ $t('user.forgotPassword') }}
        <span class="text-primary  cursor-pointer" @click="goToRestorePass">
          {{ $t('gral.here') }}
        </span>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { FRAuth, Config, StepType } from '@forgerock/javascript-sdk';
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
  created() {
    /*  Config.set({
      clientId: "my_client_id",
      redirectUri: "https://myapp.domain.com/callback",
      scope: "openid profile me.read",
      realmPath: "root",
      serverConfig: {
        baseUrl: "https://mytenant.forgeblocks.local/am/",
        timeout: 30000
      },
      tree: "UsernamePassword"
    });
    this.handleAuth(); */
  },
  methods: {
    async handleAuth(previousStep) {
      /*   console.log("Login");

      const thisStep = await FRAuth.next(previousStep);

      switch (thisStep.type) {
        case StepType.LoginSuccess:
          const token = thisStep.getSessionToken();
          console.log(token);
          break;
        case StepType.LoginFailure:
          const detail = thisStep.getDetail();
          console.log(detail);
          break;
        case StepType.Step:
          // Populate `thisStep` callbacks here, and then continue
          thisStep.setInputValue("foo");
          this.handleAuth(thisStep);
          break;
      } */

      this.$router.push({ name: 'dashboard' });
    },
    goToRestorePass() {
      this.$router.push({ name: 'forgotPassword' });
    },
  },
};
</script>
