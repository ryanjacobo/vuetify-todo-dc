<template>
  <v-dialog
    ref="dialog"
    :value="true"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <!-- <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Picker in dialog"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template> -->

    <v-date-picker v-model="date" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="$emit('close')">
        Cancel
      </v-btn>
      <v-btn text color="primary" @click="saveTask">
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      date: null
    };
  },
  mounted() {
    if (this.task.dueDate) {
      this.date = this.task.dueDate;
    }
  },
  methods: {
    saveTask() {
      let payload = {
        id: this.task.id,
        dueDate: this.date
      };
      this.$store.dispatch("taskDueDateUpdated", payload);
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>