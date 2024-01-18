<template>
    <div>
        <h1>Scanme</h1>
        <div id="interactive" class="viewport scanner">
            <video></video>
        </div>
    </div>
</template>

<script setup>
import Quagga from '@ericblade/quagga2'
import { onMounted } from 'vue'

onMounted(() => {
    // Configure Quagga and start the scanner
    Quagga.init(
        {
            inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: document.querySelector('#barcode-scanner')
            },
            decoder: {
                readers: ['code_128_reader', 'ean_reader', 'upc_reader']
            }
        },
        function (err) {
            if (err) {
                console.error(err)
                return
            }
            Quagga.start()
        }
    )
})

// Attach listener to handle barcode detection
Quagga.onDetected(function (result) {
    // Stop the scanner
    Quagga.stop()

    // Get the barcode data
    const barcode = result.codeResult.code

    // Send the barcode via POST request
    sendBarcode(barcode)
})

// Function to send barcode via POST request
function sendBarcode(barcode) {
    const url = 'http://kas.tw/tagrecieve'

    // You need to implement the actual POST request here
    // This is just a placeholder and won't work without a backend
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ barcode: barcode })
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data)
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}
</script>

<style></style>
