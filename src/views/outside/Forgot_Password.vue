<template>
    <div class="outside">

        <div class="outside__form" v-if="show_site">

            <img class="logo" src="../../assets/img/zzgo.png" />

            <router-link class="outside__backlink" :to="{ path: '/login' }">⇦ Back</router-link>

            <h1>Reset Password</h1>

            <div class="outside__form__message" v-html="message">
            </div>

            <input type="text" v-model="email" placeholder="E-Mail address" />

            <a class="button outside__form__submit" @click="login">Send reset mail</a>

        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        show_site: false,

		email: '',
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
	
    methods: {
        login: function () {
            
        }
    },
}
</script>