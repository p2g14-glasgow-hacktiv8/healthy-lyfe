const baseURL = "http://localhost:3000"

$(document).ready (function() {
    checkAuth()

    $("#logout-button").click(function () {
        localStorage.clear()

        // DARI GOOGLE
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.')
        })

        checkAuth()
    })

    $("#back-to-login").click (function () {
        checkAuth ()
    })

    $("#go-register").click (function (event) {
        event.preventDefault()

        $("#login").hide()
        $("#logout-button").hide()
        $("#apps").hide()
        $("#register").show()
    })

    $("login-button").click(function (event) {
        event.preventDefault()

        const email = $ ("#email-login").val()
        const password = $ ("#password-login").val()

        $.ajax ({
            method: "POST",
            url: `${baseURL}/login`,
            data: { email, password }
        })
        .done (response => {
            localStorage.setItem ("access_token", response.access_token)
            checkAuth()
        })
        .fail (err => {
            console.log(err)
        })
        .always (function () {
            $ ("#email-login").val("")
            $ ("#password-login").val("")
        })

    })

    $("register-button").click (function (event) {
        event.preventDefault()
        const username = $ ("#username-register").val()
        const email = $ ("#email-register").val()
        const password = $ ("#password-register").val()

        $.ajax ({
            method: "POST",
            url: `${baseURL}/loginGoogle`,
            data: { username, email, password }
        })
        .done (response => {
            checkAuth()
        })
        .fail (err => {
            console.log(err)
        })
        .always (function () {
            $ ("#username-register").val("")
            $ ("#email-register").val("")
            $ ("#password-register").val("")
        })
    })
})

function checkAuth() {
    if (localStorage.access_token) {
        $("#login").hide()
        $("#register").hide()
        $("#logout-button").hide()
        $("#apps").show()
    } else {
        $("#login").show()
        $("#register").hide()
        $("#logout-button").hide()
        $("#apps").hide()
    }
}

function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    const id_token = googleUser.getAuthResponse().id_token;

    $.ajax ({
        method: "POST",
        url: `${baseURL}/loginGoogle`,
        data: { id_token }
    })
    .done (response => {
        localStorage.setItem("access_token", response.access_token)
        checkAuth()
        console.log(response.access_token)
    })
    .fail (err => {
        console.log(err)
    })

}

$("#signup").click(function() {
    $("#first").fadeOut("fast", function() {
    $("#second").fadeIn("fast");
    });
    
    $("#signin").click(function() {
    $("#second").fadeOut("fast", function() {
    $("#first").fadeIn("fast");
    });
    });    
    
});

$('#search-btn').click(event => {
    event.preventDefault();

    let recipe = $('#recipe').val()
    console.log(recipe);

    $.ajax({
        method: "POST",
        url: `${baseURL}/recipes/search`,
        headers: {
            access_token: localStorage.access_token,
        },
        data: {
            recipe
        }
    })
        .done(listRecipes => {
            getRecommendedRecipes()
        })
        .fail(xhr => {
            $('#error-found-recipes').fadeIn(500)
            let errorFoundRecipes = setInterval(() => {
                $('#error-found-recipes').fadeOut(500);
                clearInterval(errorFoundRecipes)
            }, 2500)
        })
})

function getRecommendedRecipes() {
    $.ajax({
        method: "GET",
        url: `${baseURL}/recipes/random`,
        headers: {
            access_token: localStorage.access_token,
        },
    })
        .done(recipes => {
            console.log(recipes);
        })
        .fail(xhr => {
            console.log(xhr);
        })
}