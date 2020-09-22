<template>
  <q-page class="flex flex-center bg-grey-1">
    <e-table
      :data="intercambios"
      :columns="columns"
      :showAddBtn="false"
      :serverSide="false"
    >
    </e-table>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      intercambios: [
        {
          folio: 123131231,
          name: 'Pancho Lopez',
        },
        {
          folio: 1212,
          name: 'Rene Garcia',
        },
        {
          folio: 11,
          name: 'Pancho Daniel',
        },
        {
          folio: 222,
          name: 'Vane Garcia',
        },
        {
          folio: 333,
          name: 'Lizeth Lopez',
        },
        {
          folio: 4444,
          name: 'Joselyn Garcia',
        },
        {
          folio: 5555,
          name: 'Pancho Hernandez',
        },
        {
          folio: 666,
          name: 'Denisse Garcia',
        },
      ],
      columns: [
        {
          name: 'folio',
          required: true,
          align: 'center',
          label: 'Folio',
          field: 'folio',
          format: val => `${this.$options.filters.dummy(val)}`,
          sortable: true,
          exportable: true,
          type: 'Number',
        },
        {
          name: 'name',
          required: true,
          align: 'center',
          label: 'Nombre',
          field: 'name',
          format: val => val,
        },
      ],
    };
  },
};
</script>
