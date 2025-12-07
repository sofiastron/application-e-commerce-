<template>
    <div >
        <h2>{{islogin ? 'Authentication' :'Register'}}</h2>
        <form @submit.prevent="handlesubmit" class="sofi">

            <label for="email">Email :</label>
            <input type="email" v-model="email" id="email" required />

            <label for="password">Password :</label>
            <input type="password" v-model="password" id="password" required />

            <button type="submit">{{islogin? 'Login' : 'Register'}}</button>
            <p class="switch">
                 <span v-if="islogin">Don’t have an account?
                    <a @click="islogin = false">Register here</a>
                 </span>
                    <span v-else>Already have an account?
                        <a @click="islogin = true">Login here</a>
                    </span>

            </p>

            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            <p v-if="successMessage" class="success">{{ successMessage }}</p>
        </form>
        
    </div>
</template>

<script>
import { login ,register} from '../services/authService';

export default {
    data() {
        return {
            email: '',        // Important : Firebase = email + password
            password: '',
            islogin: true,
            errorMessage: '',
            successMessage: ''
        };
    },
    methods: {
       async handlesubmit(){
            this.errorMessage = '';
            this.successMessage = '';
            try {
                if(this.islogin){
                    await login(this.email, this.password);
                    this.$router.push('/home'); 
                    
                } else {
                    await register(this.email, this.password);
                    this.successMessage = 'Registration successful! Please verify your email.';
                    this.$router.push('/home'); 
                }
            } catch (error) {
                this.errorMessage = error.message;
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

/* Ecrans tablette */
@media screen and (max-width: 768px) {
  .sofi {
    max-width: 90%;
    padding: 15px;
  }

  input, button {
    font-size: 15px;
  }
}

/* Ecrans mobile */
@media screen and (max-width: 480px) {
  .sofi {
    max-width: 95%;
    padding: 10px;
  }
}
</style>