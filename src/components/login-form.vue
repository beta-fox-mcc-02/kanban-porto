<template>
    <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-md-auto">
                    <div class="form_page">
                        <form @submit.prevent="loginUser">
                            <div class="form-group">
                                <label for="login_inputEmail">Email</label>
                                <input type="email" class="form-control" v-model="loginEmail" placeholder="Email" required>
                            </div>
                            <div class="form-group">
                                <label for="login_inputPassword">Password</label>
                                <input type="password" class="form-control" v-model="loginPassword" placeholder="Password" required>
                            </div>
                            <button type="submit" v-show="loginEmail && loginPassword" class="btn btn-primary">Login</button>
                            <!-- Google SignIn Button -->
                            <div class="g-signin2" data-onsuccess="onSignIn"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>  
</template>