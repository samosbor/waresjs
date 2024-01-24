import { reactive } from 'vue'

const store = {
    state: reactive({
        isAuthenticated: null,
        email: '',
        role: '',
        currentRoom: null
    }),
    actions: {
        initialize() {
            if (store.state.isAuthenticated == null) {
                store.state.isAuthenticated = false
            }
        },
        afterLoginUpdate(userData) {
            if (userData.email && userData.email !== ''){
                store.state.isAuthenticated = true
                store.state.email = userData.email
            }
            
        }
    }
}

export default store