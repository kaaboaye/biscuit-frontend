<template>
  <div>
    <h1>{{tea.name}}</h1>

    <v-card>
      <v-card-title>
        <h3>Dodaj sposób zaparzania</h3>
      </v-card-title>

      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @keyup.native.enter="save"
          style="width: 100%"
        >
          <v-layout row wrap class="x-grid-lg">
            <v-flex>
              <v-text-field
                v-model="brewing.amount"
                type="number"
                :rules="[
                  v => !!v || 'Ilość jest wymagana', 
                  v => (v > 0) || 'Ilość nie może być ujemna'
                ]"
                label="Ilość [g]"
                required
              />
            </v-flex>

            <v-flex>
              <v-text-field
                v-model="brewing.timespan"
                type="number"
                :rules="[
                  v => !!v || 'Czas zaparzania jest wymagany', 
                  v => (v > 0) || 'Czas zaparzanie nie może być ujemny'
                ]"
                label="Czas zaparzania"
                required
              />
            </v-flex>

            <v-flex>
              <v-text-field
                v-model="brewing.waterTemp"
                type="number"
                :rules="[v => !!v || 'Temperatura wody  jest wymagana']"
                label="Temperatura wody"
                required
              />
            </v-flex>

            <v-flex>
              <v-text-field
                v-model="brewing.taste"
                :rules="[v => !!v || 'Smak jest wymagany']"
                label="Smak"
                required
              />
            </v-flex>
          </v-layout>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn :disabled="!valid" @click="save" flat color="green">Dodaj</v-btn>
        <v-btn @click="reset" flat color="orange">Reset</v-btn>
      </v-card-actions>
    </v-card>

    <v-card>
      <v-card-title>
        <h3>Sposoby zaparzania</h3>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-search-web"
          label="Wyszukaj"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="tea.brewings" :search="search">
        <template slot="items" slot-scope="{item: brewing}">
          <td>{{brewing.amount}} g</td>
          <td>{{brewing.timespan}} s</td>
          <td>{{brewing.waterTemp}} ºC</td>
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
      valid: true,
      search: "",
      brewing: {},
      headers: [
        { text: "Ilość", value: "amount" },
        { text: "Czas parzenia", value: "timespan" },
        { text: "Temperatura wody", value: "waterTemp" },
        { text: "Smak", value: "taste" }
      ]
    };
  },

  created() {
    this.$store.dispatch("getTea", this.$route.params.teaId);
    this.reset();
  },

  watch: {
    $route(route) {
      this.$store.dispatch("getTea", route.params.teaId);
    }
  },

  computed: {
    tea() {
      return this.$store.getters.tea;
    }
  },

  methods: {
    save() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.$store.dispatch("addBrewing", { brewing: this.brewing });
    },

    reset() {
      this.brewing = {
        amount: 5,
        timespan: 60,
        waterTemp: 95,
        taste: ""
      };
    }
  }
};
</script>

<style>
.v-card__title {
  margin: 2em;
}
</style>