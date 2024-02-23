<template>
    <div>
        <h1>Scanme</h1>
        <BarcodeScanner :qrbox="250" :fps="10" style="width: 500px" @result="onScan" />
    </div>
</template>

<script>
import BarcodeScanner from '@/components/BarcodeScanner.vue'
import store from '@/store'
export default {
    components: {
        BarcodeScanner
    },
    methods: {
        onScan(decodedText, decodedResult) {
            console.log('Scan result:', decodedResult)
            this.sendScanEvent(decodedText)
        },
        sendScanEvent(identifier) {
            const url = import.meta.env.VITE_SERVER_URL + 'assets/scan/' + identifier
            const state = store.actions.currentState()

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    identifier: identifier,
                    google_email: state.email,
                    user_id: state.user_id,
                    location: null,
                    wifi_ap: null
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data)
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        }
    }
}
</script>

<style></style>
