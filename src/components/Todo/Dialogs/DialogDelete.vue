<template>
  <v-dialog :value="true" persistent max-width="290">
    <!-- <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Open Dialog
      </v-btn>
    </template> -->
    <v-card>
      <v-card-title class="headline">
        Delete Task?
      </v-card-title>
      <v-card-text>Are you sure you want to delete the task?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$emit('close')">
          Cancel
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="$store.dispatch('taskDeleted', task.id)"
        >
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["task"]
};
</script>

<style>
</style>