<template>
    <div class="outside">
        
        <div class="outside__form" v-if="show_site">

            <img class="logo" src="../../assets/img/zzgo.png" />

            <h1>Login</h1>

            <div class="outside__form__message" v-html="message">
            </div>

            <input type="text" v-model="username" placeholder="Username" />
            <input type="password" v-model="password" placeholder="Password" />

            <label class="stay_logged_in">
                <input type="checkbox" v-model="stay_logged_in" />
                <span></span>
                Stay logged in
            </label>

            <el-row class="outside__form__submit">
                <el-col :span="12">
                    <a class="button" @click="login">Login</a>
                </el-col>
                <el-col :span="12" class="forgot_password">
                    <router-link :to="{ path: '/forgot-password' }" class="textlink">Forgot password?</router-link>
                </el-col>
            </el-row>

        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        show_site: false,

		username: '',
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
	
    methods: {
        login: function () {
            
        }
    },
}
</script>

<style scoped lang="scss">
.forgot_password {
    text-align: right;
    padding-top: 19px;
}
.stay_logged_in {
    margin: 0px 0 40px;
}
</style>