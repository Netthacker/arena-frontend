<script lang="ts">
import { defineComponent, ref, watch, onBeforeMount } from 'vue';

export default defineComponent({
  name: 'Toast',
  props: {
    status: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    show:{
      type: Boolean,
      required:true,
    }
  },
  setup(props) {


    return {
      props,
    };
  }
})
</script>

<template>

  <v-snackbar
          v-model="props.show"
          multi-line
          :color="props.status==='success'?'green-darken-2':'red-accent-4'"
          :timeout="2000"

        >
          {{message}}

    </v-snackbar>
</template>

