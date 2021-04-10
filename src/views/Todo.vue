<template>
  <div class="home">
    <list-tasks v-if="$store.state.tasks.length"></list-tasks>
    <no-tasks v-else />
    <!-- <button-done-sorting /> -->
    <button-done-sorting v-if="$store.state.sorting" />
  </div>
</template>

<script>
import ListTasks from "@/components/Todo/ListTasks";
import NoTasks from "@/components/Todo/NoTasks";
import ButtonDoneSorting from "@/components/Todo/Dialogs/ButtonDoneSorting";
export default {
  components: {
    // 'field=add-task': require('@components/todo/FieldAddTask.vue').default
    ListTasks,
    NoTasks,
    ButtonDoneSorting
  },
  name: "Home"
};
</script>


