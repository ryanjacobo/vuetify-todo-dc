import Vue from "vue";
import Vuex from "vuex";
import Localbase from "localbase";

let db = new Localbase("db");
db.config.debug = false; // removes the localbase changes logs from the console

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: null,
    appTitle: process.env.VUE_APP_TITLE,
    tasks: [
      // {
      //   id: 1,
      //   title: "Wake up",
      //   done: false,
      //   dueDate: "2021-3-31",
      // },
      // {
      //   id: 2,
      //   title: "Make breakfast",
      //   done: false,
      //   dueDate: "2021-4-1",
      // },
      // {
      //   id: 3,
      //   title: "Eat breakfast",
      //   done: false,
      //   dueDate: "",
      // },
    ],
    snackbar: {
      show: false,
      text: "",
    },
    sorting: false,
  },
  mutations: {
    setSearch(state, value) {
      console.log("value: ", value);
      state.search = value;
    },
    addTask(state, newTask) {
      console.log("addTask");

      state.tasks.push(newTask);
    },
    doneTask(state, id) {
      // console.log("id: ", id);
      let task = state.tasks.filter((task) => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    showSnackbar(state, text) {
      let timeout = 0;
      // if snackbar.show = true, create a delay of 300 before showing the next snackbar.
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      // Else, no delay (timeout = 0) before showing the snackbar.
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },
    closeSnackbar(state) {
      state.snackbar.show = false;
    },
    updateTaskTitle(state, payload) {
      console.log("payload: ", payload);
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.title = payload.title;
    },
    updateTaskDueDate(state, payload) {
      console.log("payload: ", payload);
      db.collection("tasks").doc();
      let task = state.tasks.filter((task) => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    },
    toggleSorting(state) {
      state.sorting = !state.sorting;
    },
    setTasks(state, tasks) {
      console.log("tasks: ", tasks);
      state.tasks = tasks;
    },
  },
  actions: {
    taskAdded({ commit }, newTaskTitle) {
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false,
        dueDate: null,
      };
      db.collection("tasks")
        .add(newTask)
        .then(() => {
          commit("addTask", newTask);
          commit("showSnackbar", "Task Added!");
        });
    },
    taskDeleted({ commit }, id) {
      db.collection("tasks")
        .doc({ id: id })
        .delete()
        .then(() => {
          commit("deleteTask", id);
          commit("showSnackbar", "Task Deleted!");
        });
    },
    taskTitleUpdated({ commit }, payload) {
      db.collection("tasks")
        .doc({ id: payload.id })
        .update({
          title: payload.title,
        })
        .then(() => {
          commit("updateTaskTitle", payload);
          commit("showSnackbar", "Task updated!");
        });
    },
    taskDueDateUpdated({ commit }, payload) {
      db.collection("tasks")
        .doc({ id: payload.id })
        .update({
          dueDate: payload.dueDate,
        })
        .then(() => {
          commit("updateTaskDueDate", payload);
          commit("showSnackbar", "Task due date updated!");
        });
    },
    getTasks({ commit }) {
      // console.log("getTasks");
      db.collection("tasks")
        .get()
        .then((tasks) => {
          // console.log("tasks: ", tasks);
          commit("setTasks", tasks);
        });
    },
    taskDone({ state, commit }, id) {
      let task = state.tasks.filter((task) => task.id === id)[0];

      db.collection("tasks")
        .doc({ id: id })
        .update({ done: !task.done })
        .then(() => {
          commit("doneTask", id);
        });
    },
    setTasks({ commit }, tasks) {
      db.collection("tasks").set(tasks);
      commit("setTasks", tasks);

      // .then(() => {
      //   commit("setTasks", tasks);
      // }); // remove .then method to fix the glitch of the tasks flashing when a task is dragged to a new position
    },
  },
  getters: {
    tasksFiltered(state) {
      if (!state.search) {
        return state.tasks;
      }
      return state.tasks.filter((task) =>
        task.title.toLowerCase().includes(state.search.toLowerCase())
      );
    },
  },
  modules: {},
});
