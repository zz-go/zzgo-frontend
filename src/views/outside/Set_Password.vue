<template>
    <div class="outside">
        
        <div class="outside__form" v-if="show_site">

            <img class="logo" src="../../assets/img/zzgo.png" />

            <router-link class="outside__backlink" :to="{ path: '/login' }">⇦ Back</router-link>

            <h1>Set Password</h1>

            <div class="outside__form__message" v-html="message">
            </div>

            <input type="password" v-model="password" placeholder="Password" />
            <input type="password" v-model="password_repeat" placeholder="Repeat password" />

            <a class="button outside__form__submit" @click="login">Set password</a>

        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        show_site: false,

		password_repeat: '',
		password: '',
        stay_logged_in: false,
        message: '&nbsp;',
	}),
    
    created(){
        var that = this;
        setTimeout(function(){
            that.show_site = true;
        });
    },
	
	computed: {
		...mapGetters({
		}),
	},
	
    watch: {
        login: function () {
            
        }
    },
}
</script>