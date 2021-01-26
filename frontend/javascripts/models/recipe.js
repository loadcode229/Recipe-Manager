class Recipe {

    static all = []

    constructor(title, status='Incomplete', cook_time, prep_time, directions, ingredients, id) {
        this.title = title
        this.status = status
        this.cook_time = cook_time
        this.prep_time = prep_time
        this.directions = directions
        this.ingredients = ingredients
        this.id = id
        Recipe.all.push(this)
    }

    static postRecipe(recipeData) {
        let formData = {
            "title": recipeData.title.value,
            "status": recipeData.status = "Incomplete",
            "cook_time": recipeData.cook_time.value,
            "prep_time": recipeData.prep_time.value,
            "directions": recipeData.directions.value,
            "ingredients": recipeData.ingredients.value,
            "user_id": recipeData.querySelector('select').value
        }

        let configObj = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        return fetch(Api.RECIPES_URL, configObj)
            .then(response => response.json())
            .then((recipeObj) => {
                let user = User.all.find(chosenUser => recipeObj.user_id == chosenUser.id)
                let newObj = new Recipe(recipeObj.title, recipeObj.id)
                user.recipes.push(newObj)
                clearRecipeDivs()
                user.renderRecipes()
                clearForm()
            })
    }

    render() {
        let h2 = document.createElement('h2')
        h2.innerHTML = `<strong>${this.title}</strong>`

        let h3 = document.createElement('h3')
        h3.innerHTML = '<em>Status: ♡ </em>'

        let h4 = document.createElement('h4')
        h4.innerHTML = `<strong>${this.cook_time} minutes | ${this.prep_time} minutes`

        let tbody = document.createElement('tbody')
        tbody.innerHTML = `${this.directions}`
        
        let p = document.createElement('p')
        p.setAttribute('class', 'recipe-status')
        p.innerHTML = `${this.status}`
        

        let completeBtn = document.createElement('button')
        completeBtn.setAttribute('class', 'complete-btn')
        completeBtn.innerText = 'Complete!'
        completeBtn.addEventListener('click', event => this.completeRecipeHandler(event, this))

        let resetBtn = document.createElement('button')
        resetBtn.setAttribute('class', 'reset-recipe-button')
        resetBtn.innerText = 'Reset'
        resetBtn.addEventListener('click', event => this.resetHandler(event, this))

        if (p.innerHTML === 'Incomplete') {
            p.style.color = 'red'
            resetBtn.style.display = 'none'
        } else {
            p.style.color = 'green'
            completeBtn.style.display = 'none'
        }

        let deleteBtn = document.createElement('button')
        deleteBtn.setAttribute('class', 'delete-recipe-btn')
        deleteBtn.innerText = 'Delete'
        deleteBtn.addEventListener('click', event => this.deleteRecipeHandler(event, this))

        let divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')
        divCard.setAttribute('id', `${this.id}`)
        divCard.append(h2, h3, h4, tbody, p, completeBtn, resetBtn, deleteBtn)
        recipeCollection.append(divCard)
    }

    static renderRecipes(recipes) {
        recipes.forEach(recipeObj => {
            let newObj = new Recipe(recipeObj.title, recipeObj.status, recipeObj.cook_time, recipeObj.prep_time, recipeObj.directions, recipeObj.ingredients, recipeObj.id)
            newObj.render()
        })
    }

    deleteRecipeHandler() {
        event.preventDefault()
        fetch(`${Api.RECIPES_URL}/${this.id}`,{
            method: 'DELETE'
        })
        .then(() => {
            document.getElementById(`${this.id}`).remove()
            Recipe.all = Recipe.all.filter(recipe => recipe.id !== this.id)
        })
    }

    completeRecipeHandler() {
        let cardIns = event.target.parentNode
        cardIns.querySelector('.reset-recipe-button').style.display = 'block'
        event.preventDefault()

        let toggleResetBtn = event.target.style.display = 'none'

        let statusUpdate = event.target.previousElementSibling
        statusUpdate.innerHTML = `Completed!`
        statusUpdate.style.color = 'green'

        fetch(`${Api.RECIPES_URL}/${this.id}`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'status': statusUpdate.textContent
            })
        })
        .then(parseJSON)
        .then(newStatus => {
            statusUpdate
        })
    }

    resetHandler() {
        let resetStatus = event.target.previousElementSibling.previousElementSibling
        resetStatus.innerHTML = `Incomplete!`
        resetStatus.style.color = 'red'

        let toggleCompleteBtn = event.target.previousElementSibling
        toggleCompleteBtn.style.display = 'block'

        let toggleResetBtn = event.target.style.display = 'none'
        event.preventDefault()

        fetch(`${Api.RECIPES_URL}/${this.id}`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'status': resetStatus.textContent
            })
        })
        .then(parseJSON)
        .then(newStatus => {
            resetStatus
        })
    }
}