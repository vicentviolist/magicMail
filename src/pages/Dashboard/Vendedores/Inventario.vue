<template>
  <MainTempl>
    <template v-slot:back>
      <div class="flex justify-start  absolute-top full-width">
        <q-btn
          flat
          @click="back()"
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
          description=""
          iconFondo="img/mini-inventarios.svg"
          color="bg-inventario"
        />
        <div class="text-h4 m-y-auto">Inventarios</div>
      </div>
    </template>
    <template v-slot:desc>
      <div class="q-mb-lg" style="width:35%">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos sapiente autem.
      </div>
      <q-btn
        rounded
        label="Nuevo Juguete"
        class="q-mb-lg"
        @click="alert = true"
        icon="add"
        no-caps
        color="info"
      ></q-btn>
    </template>
    <template v-slot:table>
      <div class="full-width flex flex-center">
        <q-table
          style="height: 300px; width:55%;"
          :data="data"
          :columns="columns"
          row-key="id"
          :loading="loading"
          virtual-scroll
          :rows-per-page-options="[0]"
        >
          <template v-slot:body-cell-img="props">
            <q-td style="background: #F8F8F8;">
              <div
                class="cursor-pointer flex flex-center cont-img"
                @click="openModal(props.row.identificador)"
              >
                <img :src="props.row.image" class="cont-img-im" alt="" />
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
      <q-dialog v-model="alert">
        <q-card>
          <q-card-section
            ><div class="flex flex-center justify-between m-modal">
              <div class="img-contain flex flex-center" style="margin-left:70px">
                <img :src="image" class="img-icon" alt="" />
              </div>
              <div class="text-h6 q-mr-xl">Perfil del Producto</div>
              <q-btn
                @click="closeModal"
                v-if="editMode"
                style="margin-left:-50px;"
                rounded
                label="Eliminar"
                color="dark"
              />
              <q-btn flat @click="closeModal" round color="primary" icon="close" />
            </div>
          </q-card-section>

          <q-card-section class="q-pt-lg flex flex-center ">
            <div class="" style="width:70%">
              <m-input
                filled
                class="q-mb-lg"
                required
                v-model="identificador"
                label="IDENTIFICADOR"
              >
              </m-input>

              <m-input
                filled
                required
                class="q-mb-lg"
                v-model="producto"
                label="Producto"
              >
              </m-input>
              <m-input
                filled
                required
                class="q-mb-lg"
                type="number"
                v-model="precio"
                label="PRECIO"
              >
              </m-input>
              <m-input filled required class="q-mb-lg" v-model="marca" label="MARCA">
              </m-input>
              <m-input
                filled
                required
                class="q-mb-lg"
                v-model="disponibilidad"
                label="DISPONIBILIDAD"
              >
              </m-input>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="q-mb-xl">
            <q-btn
              v-if="editMode"
              @click="anadir"
              rounded
              class="q-mr-xl"
              label="Editar"
              color="primary"
            />
            <q-btn
              rounded
              v-if="!editMode"
              label="Guardar"
              class="q-mr-xl"
              @click="anadir"
              color="primary"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
      indexToEdit: null,
      editMode: false,
      loading: false,
      foto: null,
      identificador: null,
      producto: null,
      precio: null,
      image: null,
      marca: null,
      disponibilidad: null,
      alert: false,
      jugueteMod: false,
      separator: 'none',
      columns: [
        {
          name: 'img',
          required: true,
          label: 'Fotografia',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          align: 'center',
        },
        {
          name: 'identificador',
          align: 'center',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          label: 'Identificador',
          field: 'identificador',
        },
        {
          name: 'producto',
          label: 'producto',
          align: 'center',
          field: 'producto',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
        },
        {
          name: 'precio',
          label: 'Precio',
          align: 'center',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8; color:red;',
          format: val => `$${val}`,
          field: 'precio',
        },
        {
          name: 'marca',
          label: 'Marca',
          align: 'center',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'marca',
        },
        {
          name: 'disponibilidad',
          label: 'Disponibilidad',
          align: 'center',
          headerStyle: 'color: #6D7F9F',
          style: 'background: #F8F8F8;',
          field: 'disponibilidad',
          align: 'center',
        },
      ],
      //.include("")
      data: [],
    };
  },
  created() {
    this.tabla();
  },
  methods: {
    back() {
      this.$router.push({ name: 'vendedor' }).catch(e => console.log(e));
    },
    closeModal() {
      this.identificador = null;
      this.producto = null;
      this.precio = null;
      this.marca = null;
      this.disponibilidad = null;
      this.image = null;
      this.alert = false;
      this.editMode = false;
    },
    openModal(id) {
      //--> se tiene qu llamar el action que consulte por id
      this.indexToEdit = this.data.findIndex(toy => toy.identificador == id);
      //<-- aqui termina la consulta al back
      this.identificador = this.data[this.indexToEdit].identificador;
      this.producto = this.data[this.indexToEdit].producto;
      this.precio = this.data[this.indexToEdit].precio;
      this.marca = this.data[this.indexToEdit].marca;
      this.disponibilidad = this.data[this.indexToEdit].disponibilidad;
      this.image = this.data[this.indexToEdit].image;
      this.alert = true;
      this.editMode = true;
    },
    anadir() {
      this.alert = false;
      let identificador = this.identificador;
      let producto = this.producto;
      let precio = this.precio;
      let marca = this.marca;
      let disponibilidad = this.disponibilidad;
      let image = this.image;
      let ob = {
        identificador,
        producto,
        precio,
        marca,
        disponibilidad,
      };
      if (this.editMode) {
        // llamar a la api de PUT por id
        let toysEdited = this.data.map((toy, index) => {
          if (index == this.indexToEdit) {
            toy.identificador = this.identificador;
            toy.producto = this.producto;
            toy.precio = this.precio;
            toy.marca = this.marca;
            toy.disponibilidad = this.disponibilidad;
          }
          return toy;
        });
        console.log(toysEdited);
        this.data = toysEdited;
      } else {
        // llamar a la api de POST
        this.data.push(ob);
      }
      // limpiar datos del formulario
      this.identificador = null;
      this.producto = null;
      this.precio = null;
      this.marca = null;
      this.disponibilidad = null;
      this.image = null;
      this.editMode = false;
    },
    async tabla() {
      this.loading = true;
      //Se utiliza filtrado query.equalTo('empresa', 'Matel'); para imprimir a los usuarios que sean empresa Matel
      /* let query = new Parse.Query('_User');
      query.equalTo('empresa', 'Matel');
      const results = await query.find();
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        console.log(object.id + ' - ' + object.get('nombre'));
      } */
      // .current(); indica el usuario logiado
      let user = Parse.User.current();
      let tienda = user.get('tiendaPointer');
      let query2 = new Parse.Query('TiendaWithJuguetes');
      query2.equalTo('tiendaPointer', tienda);
      query2.include('juguetePointer');
      const igual = await query2.find();
      for (let i = 0; i < igual.length; i++) {
        const object = igual[i];
        const juguete = igual[i].get('juguetePointer');
        /* console.log(object); */
        let producto = juguete.get('nombre');
        let image = juguete.get('icon').url();
        let identificador = object.id;
        let precio = igual[i].get('unitaryPrice');
        let marca = juguete.get('marca');
        let disponibilidad = igual[i].get('stock');
        let ob = { producto, image, identificador, precio, disponibilidad, marca };
        this.data.push(ob);
      }
      this.loading = false;
    },
  },
};
</script>
