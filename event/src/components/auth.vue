<template>
    <div >
        <h2>Authentication</h2>
        <form @submit.prevent="login" class="sofi">

            <label for="email">Email :</label>
            <input type="email" v-model="email" id="email" required />

            <label for="password">Password :</label>
            <input type="password" v-model="password" id="password" required />

            <button type="submit">Login</button>

            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default {
    data() {
        return {
            email: '',        // Important : Firebase = email + password
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        async login() {
            const auth = getAuth();

            try {
                await signInWithEmailAndPassword(auth, this.email, this.password);
                this.$router.push('/home'); // redirect on success
            } catch (error) {
                this.errorMessage = 'Invalid email or password.';
            }
        }
    }
};
</script>

<style scoped>
.error {
    color: red;
    margin-top: 10px;
}
.sofi {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
