class Api {

    // URLS set

    static BASEURL = 'http://localhost:3000'
    static RECIPES_URL = `${Api.BASEURL}/recipes`
    static USERS_URL = `${Api.BASEURL}/users`

    // fetch requests for Recipes and Users

    static fetchRecipes() {
        return fetch(Api.BASEURL + '/recipes')
            .then(parseJSON)
    }

    static fetchUsers() {
        return fetch(Api.BASEURL + '/users')
            .then(parseJSON)
    }
}