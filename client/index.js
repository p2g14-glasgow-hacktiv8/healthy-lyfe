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

        const email = $("#email-login").val()
        const password = $("#password-login").val()

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

// $('.container').hide()

// SEARCH BUTTON
$('#search-btn').click(event => {
    event.preventDefault();

    let recipe = $('#recipe').val()
    // console.log(recipe);
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
            getRecommendedRecipes();
            $('#list-recipe').empty();
            let template = '';

            for (let i = 0; i < 1; i++) {
                let card = ''
                template += '<div class="row mb-2">'

                for (let j = 0; j < 3; j++) {
                    card += `
                <div class="col-md-4">
                    <div class="card">
                        <img id="img-recipe-${i * 3 + j}" class="card-img-top" src="${listRecipes[i * 3 + j].image}" alt="Card image cap">
                        <div class="card-body">
                            <h5 id="name-recipe-${i * 3 + j}" class="name-recipe-${i * 3 + j} card-title">${listRecipes[i * 3 + j].title}</h5>
                            <a id="link-recipe-${i * 3 + j}" class="btn btn-outline-danger" href="${listRecipes[i * 3 + j].sourceUrl}" id="recipe-button" target="_blank">Recipe</a>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-outline-danger" type="submit" id="bookmark-button" onclick="addRecipe(${i * 3 + j})">Bookmark</button>
                        </div>
                    </div>
                </div>\n`
                }

                template += card + '</div>\n'
            }
            $('#list-recipe').append(template)
        })
        .fail(xhr => {
            // console.log(xhr);
            $('#error-found-recipes').fadeIn(500)
            let errorFoundRecipes = setInterval(() => {
                $('#error-found-recipes').fadeOut(500);
                clearInterval(errorFoundRecipes)
            }, 2500)
        })
})

// RANDOM FUNCTION
function getRecommendedRecipes() {
    $.ajax({
        method: "GET",
        url: `${baseURL}/recipes/random`,
        headers: {
            access_token: localStorage.access_token,
        },
    })
        .done(recipes => {
            $('#recommended-recipes').empty();
            let template = '<div class="row mb-2">'

            for (let j = 0; j < 3; j++) {
                card += `
                <div class="col-md-4">
                    <div class="card">
                        <img id="img-recipe-${j}" class="card-img-top" src="${listRecipes[j].image}" alt="Card image cap">
                        <div class="card-body">
                            <h5 id="name-recipe-${j}" class="name-recipe-${j} card-title">${listRecipes[j].title}</h5>
                            <a id="link-recipe-${j}" class="btn btn-outline-danger" href="${listRecipes[j].sourceUrl}" id="recipe-button" target="_blank">Recipe</a>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-outline-danger" type="submit" id="bookmark-button" onclick="addRecipe(${j})">Bookmark</button>
                        </div>
                    </div>
                </div>\n`
            }
            template += card + '</div>\n'

            $('#recommended-recipes').append(template)
            
        })
        .fail(xhr => {
            console.log(xhr);
        })
}

// Add recipe function
function addRecipe(id) {
    let foodName = $(`.name-recipe-${id}`).text()
    let recipe = $(`#link-recipe-${id}`).attr('href') 
    let url = $(`#img-recipe-${id}`).attr('src')

    // console.log(foodName, recipe, url);
    $.ajax({
        method: 'POST',
        url: `${baseURL}/recipes`,
        headers: {
            access_token: localStorage.access_token,
        },
        data: {
            foodName,
            recipe,
            url,
        }
    })
    .done(response => {
        $('#list-recipe').empty()
        $('#list-recipe').hide()
    })
    .fail(xhr => {
        console.log(xhr);
    })
}
