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
        En esta parte podras dar de Alta, Baja, Editar, todos tus juguetes.
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
            ><div class="flex flex-center justify-between ">
              <div class="img-contain flex flex-center" style="margin-left:70px">
                <img :src="image" class="img-icon" alt="" />
              </div>
              <div class="text-h6 q-mr-xl">Perfil del Producto</div>

              <q-btn flat @click="closeModal" round color="primary" icon="close" />
            </div>
          </q-card-section>

          <q-card-section class="q-pt-lg flex flex-center ">
            <div class="" style="width:70%">
              <m-input
                filled
                required
                class="q-mb-lg"
                v-model="producto"
                :disable="editMode"
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
              <m-input
                filled
                required
                :disable="editMode"
                class="q-mb-lg"
                v-model="marca"
                label="MARCA"
              >
              </m-input>
              <m-input
                filled
                required
                class="q-mb-lg"
                type="number"
                v-model="disponibilidad"
                label="DISPONIBILIDAD"
              >
              </m-input>
              <q-file
                borderless
                v-if="!editMode"
                v-model="image"
                accept=".jpg, image/*"
                label="Elije tu foto"
              />
            </div>
          </q-card-section>

          <q-card-actions align="right" class="q-mb-xl">
            <q-btn
              @click="borrar"
              v-if="editMode"
              style="margin-left:-50px;"
              rounded
              class="q-mr-xl"
              label="Eliminar"
              color="dark"
            />
            <q-btn
              v-if="editMode"
              @click="editar"
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
              @click="nuevoJuguete"
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
    async openModal(id) {
      this.indexToEdit = this.data.findIndex(user => user.identificador == id);
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
    async nuevoJuguete() {
      let query2 = new Parse.Query('Juguetes');
      query2.equalTo('nombre', this.producto).limit(1000);
      query2.equalTo('marca', this.marca).limit(1000);
      let igual = await query2.first();

      let user = Parse.User.current();
      let tienda = user.get('tiendaPointer');
      let Child = Parse.Object.extend('Juguetes');
      let child = new Child();
      let file = new Parse.File('icon.jpg', this.image);

      if (igual != null) {
        child = igual;
      } else {
        child
          .save({
            nombre: this.producto,
            marca: this.marca,
            icon: file,
          })
          .then(
            child => {
              console.log(child);
            },
            error => {
              console.log(error);
            },
          );
      }
      let query3 = new Parse.Query('TiendaWithJuguetes');
      query3.equalTo('juguetePointer', igual);
      query3.equalTo('tiendaPointer', tienda).limit(1000);
      let res = await query3.first();
      console.log(res);
      if (res != null) {
        this.showMsg('error', 'Ya hay un producto con este nombre');
      } else {
        let Parent = Parse.Object.extend('TiendaWithJuguetes');
        let parent = new Parent();
        parent
          .save({
            juguetePointer: child,
            tiendaPointer: tienda,
            unitaryPrice: parseFloat(this.precio),
            stock: parseFloat(this.disponibilidad),
          })
          .then(
            parent => {
              console.log(parent);
              this.showMsg('ok', 'Objeto creado');
            },
            error => {
              this.showMsg('error', error);
            },
          );
        this.alert = false;
      }
    },
    async borrar() {
      let user = Parse.User.current();
      let tienda = user.get('tiendaPointer');
      let query2 = new Parse.Query('TiendaWithJuguetes').limit(1000);
      query2.equalTo('tiendaPointer', tienda).limit(1000);
      query2.include('juguetePointer').limit(1000);
      let igual = await query2.find();
      let jugueteObj = igual.find(juguete => juguete.id == this.identificador);
      console.log(igual);
      jugueteObj.destroy().then(
        jugueteObj => {
          this.showMsg('ok', 'Objeto eliminado');
        },
        error => {
          this.showMsg('error', error);
        },
      );
      this.alert = false;
    },
    async editar() {
      let user = Parse.User.current();
      let tienda = user.get('tiendaPointer');
      let query2 = new Parse.Query('TiendaWithJuguetes').limit(1000);
      query2.equalTo('tiendaPointer', tienda).limit(1000);
      query2.include('juguetePointer').limit(1000);
      let igual = await query2.find();
      let jugueteObj = igual.find(juguete => juguete.id == this.identificador);
      jugueteObj
        .save()
        .then(jugueteObj => {
          jugueteObj.set('unitaryPrice', parseFloat(this.precio));
          jugueteObj.set('stock', parseFloat(this.disponibilidad));
          this.showMsg('ok', 'Objeto editado', jugueteObj);
          return jugueteObj.save();
        })
        .catch(err => {
          this.showMsg('error', err);
        });
      this.alert = false;
    },
    async tabla() {
      this.loading = true;
      let user = Parse.User.current();
      let tienda = user.get('tiendaPointer');
      let query2 = new Parse.Query('TiendaWithJuguetes').limit(1000);
      query2.equalTo('tiendaPointer', tienda).limit(1000);
      query2.include('juguetePointer').limit(1000);
      let igual = await query2.find();
      for (let i = 0; i < igual.length; i++) {
        let object = igual[i];
        let juguete = igual[i].get('juguetePointer');
        let producto = juguete.get('nombre');
        let image = juguete.get('icon').url();
        console.log(igual[i]);
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
