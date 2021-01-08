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