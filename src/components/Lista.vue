<script lang="ts">
import { defineComponent, PropType, ref, computed, toRaw } from 'vue';

export default defineComponent({
  name: 'Lista',
  props: {
    headers: {
      type: Array as PropType<Array<{ text: string; value: string }>>,
      required: true,
    },
    items: {
      type: Array as PropType<Array<Record<string, any>>>,
      required: true,
    },
    namePopup:{
      type: String as PropType<string>,
      required:true,
    },
    arenas: {
      type: Array as PropType<Array<Record<string, any>>>,
      default: () => [],
      required: false,
    },
  },
  setup(props, { emit }) {
    const dialog = ref(false);
    const dialogDelete = ref(false);
    const editedIndex = ref(-1);
    const editedItem = ref({} as Record<string, any>);
    const defaultItem = {} as Record<string, any>;

    const filteredHeaders = computed(() => {
      return props.headers.filter(header => {
        if (!header.key) return false;
        const key = header.key.toLowerCase();
        return !(key === 'id' || key === 'actions' || key === 'created_at' || key === 'updated_at');
      });
    });

    const close = () => {
      console.log(props.arenas)
      dialog.value = false;
      setTimeout(() => {
        editedItem.value = { ...defaultItem };
        editedIndex.value = -1;
      }, 300);
    };

    const save = () => {
      if (editedIndex.value > -1) {
        emit('update-item', { index: editedIndex.value, item: editedItem.value });
      } else {
        emit('create-item', editedItem.value);
      }
      close();
    };

    const editItem = (item: Record<string, any>) => {
      editedIndex.value = props.items.indexOf(item);
      editedItem.value = { ...item };
      dialog.value = true;
    };

    const deleteItem = (item: Record<string, any>) => {
      editedIndex.value = props.items.indexOf(item);
      dialogDelete.value = true;
    };

    const deleteItemConfirm = () => {
      emit('delete-item', editedIndex.value);
      closeDelete();
    };

    const closeDelete = () => {
      dialogDelete.value = false;
    };

    return {
      dialog,
      dialogDelete,
      editedIndex,
      editedItem,
      close,
      save,
      editItem,
      deleteItem,
      deleteItemConfirm,
      closeDelete,
      filteredHeaders
    };
  },
});
</script>

<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      :sort-by="[{ key: 'name', order: 'asc' }]"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn class="mb-2" color="primary" dark v-bind="props">
                {{namePopup}}
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="12"
                      sm="12"
                      v-for="header in filteredHeaders"
                      :key="header.key"
                      >
                      <v-text-field
                        v-if="header.key!=='arenainventory_id'"
                        v-model="editedItem[header.key]"
                        :label="header.title"
                      ></v-text-field>
                      <v-select
                        v-else
                        clearable
                        v-model="editedItem[header.key]"
                        :label="header.title"
                        :items="arenas"
                        item-value="id"
                        item-title="name"

                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">Cancelar</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Tem certeza que deseja deletar esse item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Não</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">Sim</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Atualizar</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped>
.v-container {
  padding: 20px;
}
</style>
