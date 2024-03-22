<template>
    <v-data-table
        v-model="selectedAssets"
        :headers="headers"
        :items="currentAssets"
        :sort-by="[{ key: 'purchase_date', order: 'asc' }]"
        item-value="barcode"
        return-object
        show-select
        density="compact"
    >
        <!-- This top slot is the new item button and dialog -->
        <template v-slot:top>
            <v-toolbar>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ props }">
                        <v-btn color="primary" dark class="mb-2" v-bind="props"> New Item </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-text-field
                                    v-model="editedItem.name"
                                    label="Asset Name"
                                ></v-text-field>
                                <v-text-field
                                    v-model="editedItem.purchase_date"
                                    label="Purchase Date"
                                >
                                    <template v-slot:input>
                                        <div>{{ formatDate(editedItem.purchase_date) }}</div>
                                    </template>
                                </v-text-field>
                                <v-text-field
                                    v-model="editedItem.building_name"
                                    label="Building Name"
                                ></v-text-field>
                                <v-text-field
                                    v-model="editedItem.room_number"
                                    label="Room Number"
                                ></v-text-field>
                                <v-text-field
                                    v-model="editedItem.provider_name"
                                    label="Provider Name"
                                ></v-text-field>

                                <v-text-field
                                    v-model="editedItem.current_value"
                                    label="Current Value"
                                ></v-text-field>

                                <v-text-field
                                    v-model="editedItem.barcode"
                                    label="Barcode"
                                ></v-text-field>
                                <v-text-field
                                    v-model="editedItem.notes"
                                    label="Notes"
                                ></v-text-field>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5"
                            >Are you sure you want to delete this item?</v-card-title
                        >
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                                >Cancel</v-btn
                            >
                            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm"
                                >OK</v-btn
                            >
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>

        <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="editItem(item)"> mdi-pencil </v-icon>
            <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>

        <template v-slot:item.purchase_date="{ value }">
            {{ formatDate(value) }}
        </template>
    </v-data-table>
</template>
<script>
import store from '@/store'
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { title: 'Name', key: 'name' },
            { title: 'Provider', key: 'provider_name' },
            { title: 'Current Value', key: 'current_value' },
            { title: 'Purchase Date', key: 'purchase_date' },
            { title: 'Barcode', key: 'barcode' },
            { title: 'Notes', key: 'notes' },
            { title: 'Building Name', key: 'building_name' },
            { title: 'Room Number', key: 'room_number' },
            { title: 'Actions', key: 'actions', sortable: false }
        ],
        allAssets: [],
        currentAssets: [],
        selectedAssets: [],
        editedIndex: -1,
        editedItem: {
            scan_id: null,
            building_name: '',
            room_number: '',
            provider_name: '',
            name: '',
            current_value: null,
            purchase_date: null,
            barcode: '',
            notes: ''
        },
        defaultItem: {
            scan_id: null,
            building_name: '',
            room_number: '',
            provider_name: '',
            name: '',
            current_value: null,
            purchase_date: null,
            barcode: '',
            notes: ''
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        }
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        }
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
            const url = import.meta.env.VITE_SERVER_URL + 'admin/all'
            const state = store.actions.currentState()

            fetch(url, {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((data) => {
                    this.allAssets = data
                    this.currentAssets = data
                    console.log('Success:', data)
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        },

        editItem(item) {
            this.editedIndex = this.currentAssets.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.currentAssets.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.currentAssets.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.currentAssets[this.editedIndex], this.editedItem)
            } else {
                this.currentAssets.push(this.editedItem)
            }
            this.close()
        },

        // function to turn date to readable date
        formatDate(date) {
            if (date === null) {
                return ''
            }
            var options = { year: 'numeric', month: 'long', day: 'numeric' }
            return new Date(date).toLocaleDateString('en-US', options)
        }
    }
}
</script>
