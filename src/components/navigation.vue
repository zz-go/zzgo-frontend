<template>
    <div class="navigation">
		
        <router-link :to="{ path: '/' }">
		    <img class="navigation__logo" src="../assets/img/zzgo.png" />
        </router-link>

        <div class="navigation__actions">

            <router-link :to="{ path: '/' }" title="Help">
                <i class="el-icon-help"></i>
                <span>Help</span>
            </router-link>

            <router-link :to="{ path: '/' }" title="Settings">
                <i class="el-icon-setting"></i>
                <span>Settings</span>
            </router-link>

            <div class="navigation__profile">

                <el-popover
                    class="navigation__profile__popover"
                    placement="bottom"
                    width="200"
                    trigger="click">

                    <ul class="navigation__profile__list">
                        <li><a href="http://www.google.at"><i class="el-icon-switch-button"></i>Logout</a></li>
                        <li><a href="http://www.google.at"><i class="el-icon-switch-button"></i>Logout</a></li>
                        <li><a href="http://www.google.at"><i class="el-icon-switch-button"></i>Logout</a></li>
                    </ul>

                    <el-button slot="reference">
                        Christian John <i class="el-icon-arrow-down el-icon--right"></i>
                        <el-avatar size="medium" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                    </el-button>

                </el-popover>

            </div>

        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import router from '../router';

export default {
    data: () => ({
        clientFilter: '',
        clientFilter__active: false
    }),
    
	computed: {
		...mapGetters({
        }),
	},

	props: {
    },

    created() {

    },

    watch: {
        // check if organisation is still the same, otherwise load new client list
        '$route' (to, from) {
            
        },

        client: function() {

        },
    },

    methods: {

        logout() {

            this.$store.dispatch('logout', this)

        },

    }
}
</script>

<style lang="scss" scoped>
.navigation {
    position: fixed;
    width: 100%;
    height: 70px;
    background: $color-primary;
    z-index: 100;

    &__logo {
        margin: 6px 15px;
        width: 50px;
    }

    &__actions {
        float: right;
        padding-right: 15px;

        a {
            color: white;
            font-size: 30px;
            text-align: center;
            width: 60px;
            text-decoration: none;
            display: inline-block;
            height: 100%;
            padding: 19px 0 8px;
            transition: all .25s ease;

            i {
                transition: all .25s ease;
            }

            span {
                display: block;
                font-size: 10px;
                line-height: 1;
                opacity: 0;
                transition: all .25s ease;
            }

            &:hover {
                transform: translateY(-6px);

                i {
                    opacity: .8;
                }
                span {
                    opacity: 1;
                }
            }
        }
    }
}
</style>

<style lang="scss">
.navigation {
    &__profile {
        float: right;
        margin-left: 20px;
        margin-top: 17px;

        .el {
            &-button {
                background: none;
                border: none;
                color: white;
                line-height: 36px;

                i {
                    margin-left: 5px;
                }
            }
            &-avatar {
                float: right;
                margin-left: 10px !important;
            }
        }

        &__list {
            list-style-type: none;
            border: none;
            border-radius: 0;

            li {
                border-bottom: solid 1px rgba($color-primary, .1);

                a {
                    padding: 12px 17px;
                    color: rgba($color-primary, .45);
                    text-decoration: none;
                    display: block;

                    i {
                        float: left;
                        font-size: 17px;
                        margin-right: 10px;
                    }
                }

                &:hover {
                    background: #f2f2f2;

                    a {
                        color: $color-primary;
                    }
                }

                &:last-child {
                    border: none;
                }
            }
        }
    }
}
</style>