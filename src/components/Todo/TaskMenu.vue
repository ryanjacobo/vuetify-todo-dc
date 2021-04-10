<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="handleClick(i)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <dialog-edit
      v-if="dialogs.edit"
      :task="task"
      @close="dialogs.edit = false"
    />
    <dialog-due-date
      v-if="dialogs.dueDate"
      :task="task"
      @close="dialogs.dueDate = false"
    />
    <dialog-delete
      v-if="dialogs.delete"
      :task="task"
      @close="dialogs.delete = false"
    />
  </div>
</template>

<script>
import DialogDelete from "@/components/Todo/Dialogs/DialogDelete.vue";
import DialogEdit from "@/components/Todo/Dialogs/DialogEdit.vue";
import DialogDueDate from "@/components/Todo/Dialogs/DialogDueDate.vue";

export default {
  components: { DialogDelete, DialogEdit, DialogDueDate },
  props: ["task"],
  data: () => ({
    dialogs: {
      edit: false,
      dueDate: false,
      delete: false
    },
    items: [
      {
        title: "Edit",
        icon: "mdi-pencil",
        click() {
          console.log("edit");
          this.dialogs.edit = true;
        }
      },
      {
        title: "Due Date",
        icon: "mdi-calendar",
        click() {
          console.log("due date");
          this.dialogs.dueDate = true;
        }
      },
      {
        title: "Delete",
        icon: "mdi-delete",
        click() {
          console.log("delete");
          this.dialogs.delete = true;
        }
      },
      {
        title: "Sort",
        icon: "mdi-drag-horizontal-variant",
        click() {
          if (!this.$store.state.search) {
            this.$store.commit("toggleSorting");
          } else {
            this.$store.commit(
              "showSnackbar",
              "Sorting disabled while in search mode."
            );
          }
        }
      }
    ]
  }),
  methods: {
    handleClick(index) {
      this.items[index].click.call(this);
    }
  }
};
</script>

<style>
</style>