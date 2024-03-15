<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <v-toolbar :elevation="2" class="mb-2">
        <v-toolbar-title>KAS Inventory</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn to="/"> Home </v-btn>

        <v-btn to="/scan"> Scan </v-btn>

        <v-btn to="/admin"> Admin </v-btn>
    </v-toolbar>
    <RouterView />
</template>

<style></style>
