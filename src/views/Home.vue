<template>
  <div>
    <h1>{{tea.name}}</h1>

    <v-card>
      <v-card-title>Zaparzania
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-search-web"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="tea.brewings" :search="search">
        <template slot="items" slot-scope="{item: brewing}">
          <td>{{brewing.amount}}</td>
          <td>{{brewing.timespan}}</td>
          <td>{{brewing.waterTemp}}</td>
          <td>{{brewing.taste}}</td>
        </template>
        <v-alert
          slot="no-results"
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Ilość", value: "amount" },
        { text: "Czas parzenia", value: "timespan" },
        { text: "Temperatura wody", value: "waterTemp" },
        { text: "Smak", value: "taste" }
      ]
    };
  },

  computed: {
    tea() {
      return this.$store.getters.tea;
    }
  }
};
</script>
