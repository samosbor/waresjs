import { reactive } from 'vue'
import Cookies from 'js-cookie'

const store = {
    state: reactive({
        isAuthenticated: null,
        email: '',
        user_id: '',
        role: '',
        currentRoom: null
    }),
    actions: {
        initialize() {
            const cookieCheck = Cookies.get('state')
            if (cookieCheck === undefined || cookieCheck === null) {
                store.state.isAuthenticated = false
                return
            }
            const cookieState = JSON.parse(cookieCheck)
            if (
                cookieState !== undefined &&
                cookieState !== null &&
                cookieState.isAuthenticated !== undefined
            ) {
                store.state = cookieState
            }
        },
        afterLoginUpdate(userData) {
            if (userData.email && userData.email !== '') {
                store.state.isAuthenticated = true
                store.state.email = userData.email
            }
            Cookies.set('state', JSON.stringify(store.state), {
                expires: 7,
                domain: 'localhost',
                sameSite: 'Lax'
            })
            console.log(Cookies.get('state'))
        },
        currentState() {
            return store.state
        }
    }
}

export default store
