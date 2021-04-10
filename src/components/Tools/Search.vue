<template>
  <v-text-field
    :value="$store.state.search"
    @input="$store.commit('setSearch', $event)"
    @focus="searchClosed = false"
    @blur="searchClosed = true"
    :disabled="$store.state.sorting"
    class="expanding-search mt-1"
    :class="{ closed: searchClosed && !$store.state.search }"
    placeholder="Search"
    filled
    clearable
    prepend-inner-icon="mdi-magnify"
    dense
  ></v-text-field>
  <!-- "closed" is the class name of v-text-field. "search" indicates whether or not the v-text-field is null (empty).-->
</template>

<script>
export default {
  data() {
    return {
      searchClosed: true
      // search: null // keeps the text-field open when there are texts in it
    };
  }
};
</script>

<style lang="sass">
.expanding-search
  transition: max-width 0.3s
  .v-input__slot
    cursor: pointer !important
  &:before, &:after
    border-color: transparent !important
  &.closed
    max-width: 45px
    .v-input__slot
      background: transparent !important
</style>