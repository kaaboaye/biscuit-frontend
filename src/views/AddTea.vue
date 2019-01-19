<template>
  <div>
    <h1>Dodawanie herbaty</h1>

    <v-card>
      <v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation style="width: 100%">
          <v-text-field
            v-model="name"
            :rules="[v => !!v || 'Nazwa jest wymagana']"
            label="Nazwa"
            required
          />
        </v-form>
      </v-card-title>

      <v-card-actions>
        <v-btn :disabled="!valid" @click="save" flat color="green">Dodaj</v-btn>
        <v-btn @click="reset" flat color="orange">Reset</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      valid: true
    };
  },

  methods: {
    async save() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.$store.dispatch("addTea", {
        tea: { name: this.name },
        callback: tea =>
          this.$router.push({ name: "tea", params: { teaId: tea.id } })
      });
    },

    reset() {
      this.name = "";
    }
  }
};
</script>
