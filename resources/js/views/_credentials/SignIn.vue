<template>
    <div class="row d-none d-lg-block">
        <div class="col-sm-9 mx-auto">
            <div class="row justify-content-center">
                <div class="col-sm-10 text-center animated fadeInDown">
                    <h4 class="fw-bold">Sign in to Hidayah App</h4>
                    <div class="d-flex authentication-third mb-4">
                        <div class="w-60 mx-auto">
                            <button class="btn btn-text">
                                <i class="bi bi-facebook fz-18"></i>
                            </button>
                            <button class="btn btn-text">
                                <i class="bi bi-google fz-16"></i>
                            </button>
                            <button class="btn btn-text">
                                <i class="bi bi-linkedin"></i>
                            </button>
                        </div>
                    </div>
                    <small class="text-secondary fz-11">atau gunakan <span class="fw-bold fz-10">Akun terdaftar</span> anda!</small>
                </div>
            </div>
            <div class="row justify-content-center mt-3">
                <div class="col-sm-9">
                    <form novalidate autocomplete="off">
                        <div class="form-group mb-2 animated fadeInUp">
                            <!-- <label for="useremail" class="fz-11 font-poppins-bold">Username</label> -->
                            <input type="text" class="form-control my-input" name="useremail" id="useremail"
                                placeholder="Silahkan ketik username Anda" v-model="signin.useremail" required>
                        </div>
                        <div class="form-group mb-5 position-relative animated fadeInUp delay-1">
                            <!-- <label for="password" class="fz-11 font-poppins-bold">Password</label> -->
                            <input :type="!showPass ? 'password' : 'text'" class="form-control my-input pe-5" name=""
                                id="password" placeholder="Silahkan ketik password Anda" v-model="signin.password" required>
                            <i v-if="!showPass" @click="showPass = true" class="bi bi-eye-fill cursor" 
                                style="position: absolute; right: 10px; bottom: 7px;"></i>
                            <i v-if="showPass" @click="showPass = false" class="bi bi-eye-slash-fill cursor"
                                style="position: absolute; right: 10px; bottom: 7px;"></i>
                        </div>
                        <div class="row">
                            <div class="my-auto col animated fadeInRight fz-12">
                                <a href="#">Forgot Password?</a>
                            </div>
                            <div class="my-auto col-auto">
                                <a href="#" class="px-4 btn btn-success rounded-pill font-poppins-semi-bold animated fadeInLeft my-btn">
                                    <span class="trantition">Sign In</span>
                                    <i class="fas fa-arrow-right d-inline ml-2 font-13"></i>
                                </a>
                                <!-- <button type="submit"
                                    class="px-4 btn btn-primary rounded-pill muli-ex-bold animated fadeInLeft my-btn">
                                    <span class="trantition">Masuk</span>
                                    <i ng-if="!isLoading" class="fas fa-arrow-right d-inline ml-2 font-13"></i>
                                    <i ng-if="isLoading" class="fas fa-spinner fa-spin ml-2"></i>
                                </button> -->
                                <!-- pake loading ini ketika memuat data -->
                                <i v-if="isLoading" class="fas fa-spinner fa-spin ml-2"></i>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { reactive, ref } from "vue";
    let showPass = ref(false); 
    let isLoading = ref(false); 
    const signin = reactive({
        useremail: "",
        password: ""
    })
</script>

<style>
    .authentication-third {
        position: relative;
        /* background-color: aquamarine; */
    }

    .authentication-third > div::before {
        content: "";
        display: block;
        width: 90px;
        height: 1px;
        background: #d6d6d6;
        left: 0;
        top: 50%;
        position: absolute;
    }

    .authentication-third > div::after {
        content: "";
        display: block;
        width: 90px;
        height: 1px;
        background: #d6d6d6;
        right: 0;
        top: 50%;
        position: absolute;
    }

    .authentication-third button {
        margin: 0 5px;
    }
</style>