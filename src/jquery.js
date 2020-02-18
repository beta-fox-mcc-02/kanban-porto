function register(){
    $('#loginForm').hide()
    $('#registerForm').show()
    $('#loginBtn').on('click', () => login())
    $('#drop').empty()
    $('#drop').append(`
    <div class="card-body">
        <form id="registerForm">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" name="username" id="usernameRegister" class="form-control" placeholder="input your username">
            </div>
            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" name="email" id="emailRegister" class="form-control" placeholder="input your email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" id="passwordRegister" class="form-control" placeholder="input your password">
            </div>
            <button type="submit" class="btn btn-primary text-light">Register</button>
        </form>
    </div>
    `)
    $('#registerForm').on('submit', (event) => {
        event.preventDefault()
        $.ajax({
            url : 'http://localhost:3000/register',
            method : 'post',
            data : {
                username : $('#usernameRegister').val(),
                email : $('#emailRegister').val(),
                password : $('#passwordRegister').val()
            }
        })
        .then(res => {
            localStorage.token = res.data.token
            $('#homePage').hide()
            $('#nav').show()
            $('#mainPage').show()
        })
    })
}
function login(){
    $('#loginForm').show()
    $('#registerForm').hide()
    $('#registerBtn').on('click', () => register())
    $('#drop').empty()
    $('#drop').append(`
    <div class="card-body">
        <form id="loginForm">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" name="username" id="usernameLogin" class="form-control" placeholder="input your username">
            </div>
            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" name="email" id="emailLogin" class="form-control" placeholder="input your email">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" name="password" id="passwordLogin" class="form-control" placeholder="input your password">
            </div>
            <button type="submit" class="btn btn-primary text-light">Login</button>
        </form>
    </div>
    `)
    $('#loginForm').on('submit', (event) => {
        event.preventDefault()
        $.ajax({
            url : 'http://localhost:3000/login',
            method : 'post',
            data : {
                username : $('#usernameLogin').val(),
                email : $('#emailLogin').val(),
                password : $('#passwordLogin').val()
            }
        })
        .then(res => {
            localStorage.token = res.data.token
            $('#homePage').hide()
            $('#nav').show()
            $('#mainPage').show()
        })
    })
}


$(document).ready(() => {
    if(!localStorage.token){
        $('#homePage').show()
        $('#mainPage').hide()
        $('#nav').hide()
        login()
    }
    else{
        $('#homePage').hide()
        $('#mainPage').show()
        $('#logout').on('click', ()=>{
            localStorage.clear()
            $('#homePage').show()
            $('#mainPage').hide()
            $('#nav').hide()
            login()
        })
    }

})