<template>
    <div>
        <h1>Scanme</h1>
        <BarcodeScanner :qrbox="250" :fps="10" style="width: 100%" @result="onScan" />
        <v-form>
            <v-text-field v-model="scannedItemData.name" label="Asset Name" />
            <v-text-field v-model="scannedItemData.provider_name" label="Provider" />
            <v-text-field v-model="scannedItemData.barcode" label="Barcode" />
            <v-text-field v-model="scannedItemData.notes" label="Asset Notes" />
            <v-text-field v-model="scannedItemData.current_value" label="Value" />
            <v-text-field
                v-model="scannedItemData.purchase_date"
                label="Purchase Date"
                append-inner-icon="mdi-calendar-month"
                @click:append-inner="datePickOpen = !datePickOpen"
            />
            <v-dialog v-model="datePickOpen">
                <v-date-picker v-model="scannedItemData.purchase_date" no-title scrollable />
            </v-dialog>
            <v-text-field v-model="scannedItemData.room_number" label="Room Number" />
        </v-form>
        <v-btn @click="updatedScanEvent">Update</v-btn>
    </div>
</template>

<script>
import BarcodeScanner from '@/components/BarcodeScanner.vue'
import store from '@/store'
export default {
    components: {
        BarcodeScanner
    },
    data() {
        return {
            scannedItemData: {
                scan_id: null,
                asset_id: null,
                building_name: '',
                room_number: '',
                provider_name: '',
                name: '',
                current_value: null,
                purchase_date: null,
                barcode: '',
                notes: ''
            },
            datePickOpen: false,
            latestBarcode: null
        }
    },
    methods: {
        onScan(decodedText, decodedResult) {
            console.log('Scan result:', decodedResult)
            // Dont scan the same thing twice
            if (decodedText === this.latestBarcode) {
                return
            }
            this.latestBarcode = decodedText
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
                    this.scannedItemData = data
                    console.log('Success:', data)
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        },
        updatedScanEvent() {
            const newData = this.scannedItemData
            const url = import.meta.env.VITE_SERVER_URL + 'assets/scan/' + newData.scan_id

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    scan_id: newData.scan_id,
                    asset_id: newData.asset_id,
                    building_name: newData.building_name,
                    room_number: newData.room_number,
                    provider_name: newData.provider_name,
                    name: newData.name,
                    current_value: newData.current_value,
                    purchase_date: newData.purchase_date,
                    barcode: newData.barcode,
                    notes: newData.notes
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    this.scannedItemData = data
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
