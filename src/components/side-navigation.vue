<template>
    <div class="side-navigation">
		

        <div class="side-navigation__buttons">
            <el-col :span="8">
                <span class="el-icon-menu is-active"></span>
            </el-col>
            <el-col :span="8">
                <span class="el-icon-star-off"></span>
            </el-col>
            <el-col :span="8">
                <span class="el-icon-timer"></span>
            </el-col>
        </div>


        <div class="side-navigation__list">

            <el-row>
                <el-col :span="24">
                    <el-menu class="side-navigation__list__main">

                        <el-submenu index="1">

                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>Navigator One</span>
                            </template>
                    
                            <el-menu-item index="1-3">item three</el-menu-item>
                            <el-menu-item index="1-4">item three</el-menu-item>
                            <el-menu-item index="1-5">item three</el-menu-item>
                            <el-menu-item index="1-6">item three</el-menu-item>
                            <el-menu-item index="1-7">item three</el-menu-item>
                            <el-menu-item index="1-8">item three</el-menu-item>
                            <el-menu-item index="1-9">item three</el-menu-item>
                            <el-menu-item index="1-10">item three</el-menu-item>

                        </el-submenu>

                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span>Navigator Two</span>
                        </el-menu-item>

                        <el-menu-item index="3">
                            <i class="el-icon-document"></i>
                            <span>Navigator Three</span>
                        </el-menu-item>

                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span>Navigator Four</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>

        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import router from '../router';

export default {
    data: () => ({
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
.side-navigation {
    position: fixed;
    width: 280px;
    background: $color-bg-grey;
    height: calc(100% - 70px);
    top: 70px;
    left: 0;
    overflow-y: scroll;

    &__buttons {
        height: 50px;

        span {
            text-align: center;
            display: block;
            line-height: 50px;
            font-size: 18px;
            background: white;
            border-right: solid 1px $color-bg-grey;
            cursor: pointer;
            color: $color-primary;

            &:before {
                opacity: .4;
                transition: all .25s ease;
            }

            &:hover {
                &:before {
                    opacity: 1;
                }
            }

            &.is-active {
                background: $color-bg-grey;
                
                &:before {
                    opacity: 1;
                }
            }
        }
    }
}
</style>

<style lang="scss">
.side-navigation {
    &__list {
        &__main {
            .el-menu-item, 
            .el-submenu__title {
                border-bottom: solid 1px;
                border-bottom-color: $color-bg-grey-top !important;
                line-height: 45px;
                height: 45px;
                background: $color-bg-grey;
                transition: all .25s ease;
                
                & > * {
                    color: rgba($color-primary, .45);
                    transition: all .25s ease;
                }

                &.is-active {
                    background: $color-bg-grey-light;
                    & > * {
                        color: rgba($color-primary, 1);
                    }
                }
            }

            .el-submenu {
                ul {
                    li {
                        color: rgba($color-primary, .45);
                        font-size: 12px;
                        transition: all .25s ease;
                        padding-left: 50px !important;

                        &.is-active {
                            color: $color-primary;
                            background: $color-bg-grey-light;
                        }
                        &:hover {
                            color: white;
                        }
                    }
                }
            }

            .el-menu-item:hover,
            .el-submenu__title:hover {
                background: $color-primary !important;
                border-bottom: solid 1px $color-primary;

                > * {
                    color: white;
                }
            }
        }
    }
}
</style>