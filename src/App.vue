<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {}
};
</script>

<style>
.vs--searchable .vs__search::placeholder,
.vs--searchable .vs__dropdown-toggle,
.vs--searchable .vs__dropdown-menu {
  padding: 6px;
}

.vs--searchable .vs__clear,
.vs--searchable .vs__open-indicator {
  margin: 0 10px;
}
</style>
