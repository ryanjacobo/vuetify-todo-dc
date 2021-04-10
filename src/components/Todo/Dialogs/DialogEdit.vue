<template>
  <v-dialog :value="true" persistent max-width="290">
    <!-- <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Open Dialog
      </v-btn>
    </template> -->
    <v-card>
      <v-card-title class="headline">
        Edit Task
      </v-card-title>
      <v-card-text
        >Edit Task Title
        <v-text-field v-model="taskTitle" @keyup.enter="saveTask" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="$emit('close')">
          Cancel
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="saveTask"
          :disabled="taskTitleInvalid"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      taskTitle: null
    };
  },
  mounted() {
    this.taskTitle = this.task.title;
  },
  computed: {
    taskTitleInvalid() {
      return !this.taskTitle || this.taskTitle === this.task.title;
    }
  },
  methods: {
    saveTask() {
      if (!this.taskTitleInvalid) {
        let payload = {
          id: this.task.id,
          title: this.taskTitle
        };
        this.$store.dispatch("taskTitleUpdated", payload);
        this.$emit("close");
        this.$vuetify.goTo(0, { duration: 0 });
      }
    }
  }
};
</script>

<style>
</style>