<script setup>
import { decodeCredential } from 'vue3-google-login'
import store from '@/store'
import router from '@/router'
const callback = (response) => {
    // decodeCredential will retrive the JWT payload from the credential
    const userData = decodeCredential(response.credential)
    console.log('Handle the userData', userData)
    store.actions.afterLoginUpdate(userData)
    router.push('scan')
}
</script>

<template>
    <main>
        <div class="text-3xl font-bold underline"></div>
        <GoogleLogin :callback="callback" />
    </main>
</template>
