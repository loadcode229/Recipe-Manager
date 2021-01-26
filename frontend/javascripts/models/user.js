class User {
    static all = []

    constructor(name, id) {
        this.name = name
        this.id = id
        this.recipes = []

        User.all.push(this)
    }

    addRecipe(recipe) {
        let r = new Recipe(recipe.title, recipe.status, recipe.prep_time, recipe.cook_time, recipe.directions, recipe.ingredients, recipe.id)
        this.recipes.push(r)
    }

    renderRecipes() {
        let userSortedChores = this.recipes.sort((a, b) => (a.title > b.title) ? 1 : -1)
        userSortedChores.forEach(recipeObj => {
            recipeObj.render()
        })
    }

    static postUser(userObj) {
        let formData = {
            "name": userObj.name.value,
        }

        let configObj = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        return fetch(Api.USERS_URL, configObj)
            .then(response => response.json())
            .then(userObj => {
                let newUserObj = new User(userObj.name, userObj.id)
                return newUserObj
            })
            .then(clearNewUserForm)
            .then(clearUserDD)
            .then(clearNewRecipe)
            .then(User.renderDropDownOptions)
            .then(User.renderUsers)
    }

    static renderDropDownOptions() {
        User.all.forEach(user => {
            let option = document.createElement('option')
            option.setAttribute('value', user.id)
            let user_name = document.createTextNode(user.name)
            option.appendChild(user_name)
            selectWhichUser.appendChild(option)
        })
    }

    static renderUsers() {
        User.all.forEach(user => {
            let option = document.createElement("option")
            option.value = user.id
            option.textContent = user.name
            select.appendChild(option)
        })
    }
}