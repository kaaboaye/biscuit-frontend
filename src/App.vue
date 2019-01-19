<template>
  <v-app>
    <v-navigation-drawer fixed clipped app v-model="sideMenu">
      <v-list dense>
        <v-list-tile :to="{ name: 'home' }" exact>
          <v-list-tile-action>
            <v-icon>mdi-desktop-mac-dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Herbaty</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="tea in $store.state.teas"
          :key="tea.id"
          :to="{ name: 'home', params: {teaId: tea.id} }"
        >
          <v-list-tile-action>
            <v-icon>mdi-seat-individual-suite</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{tea.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar v-if="!$route.meta.noHud" dense fixed clipped-left app dark color="#FF3063">
      <v-toolbar-side-icon @click.stop="toggleSideMenu"></v-toolbar-side-icon>
      <v-toolbar-title>
        <span @click="$router.push({name: 'home'})">Herbatnik</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon flat class="ma-4" @click="$router.push({ name: 'home' })"></v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    sideMenu: true
  }),

  created() {
    this.$store.dispatch("getTeas");
  },

  watch: {
    $route(route) {
      const teaId = this.$route.params.teaId;
      if (teaId) {
        this.$store.dispatch("getTea", teaId);
      }
    }
  },

  methods: {
    toggleSideMenu() {
      this.sideMenu = !this.sideMenu;
    }
  }
};
</script>

<style>
h1 {
  margin-bottom: 1em;
}
</style>