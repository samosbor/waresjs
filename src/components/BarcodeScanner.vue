<template>
    <div id="qr-code-full-region"></div>
</template>

<script>
import { Html5QrcodeScanner } from 'html5-qrcode'
export default {
    data() {
        return {
            html5QrcodeScanner: {}
        }
    },
    props: {
        qrbox: {
            type: Number,
            default: 250
        },
        fps: {
            type: Number,
            default: 10
        }
    },
    mounted() {
        const config = {
            fps: this.fps,
            qrbox: this.qrbox
        }
        this.html5QrcodeScanner = new Html5QrcodeScanner('qr-code-full-region', config)
        this.html5QrcodeScanner.render(this.onScanSuccess)
    },
    beforeUnmount() {
        this.html5QrcodeScanner.clear()
    },
    methods: {
        onScanSuccess(decodedText, decodedResult) {
            this.$emit('result', decodedText, decodedResult)
        }
    }
}
</script>
