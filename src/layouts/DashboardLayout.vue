<template>
  <q-layout view="hHh lpR fFf">
    <div elevated class=" bg-white q-px-lg q-py-sm">
      <div class="row items-center">
        <div class="text-primary text-h2">
          MAGIC MAIL
        </div>
        <q-space />
        <q-select
          borderless
          color=""
          hide-dropdown-icon
          label="Usuario Name"
          label-color=""
          :value="value"
          @input="val => $emit('input', val)"
          style="min-width:150px;"
        >
          <template v-slot:append>
            <q-icon
              v-if="!!value"
              name="clear"
              size="xs"
              @click.stop="$emit('input', null)"
              class="cursor-pointer"
            />
            <q-icon name="keyboard_arrow_down" />
          </template>
        </q-select>
        <e-avatar size="40px" class="q-mr-md" />
      </div>
    </div>
    <q-page-container>
      <router-view />
      <q-footer class="text-center text-black bg-white text-weight-light q-py-xl"
        >Política de privacidad | Términos y condiciones | Copyright © 2021 Magic
        Mail Todos los derechos reservados.</q-footer
      >
    </q-page-container>
  </q-layout>
</template>

<script>
import EAvatar from 'src/components/local/EAvatar';
export default {
  components: {
    EAvatar,
  },
  data() {
    return {};
  },
};
</script>
