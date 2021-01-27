class Recipe {

    static all = []

    constructor(title, status='Like', cook_time, prep_time, directions, id) {
        this.title = title
        this.status = status
        this.cook_time = cook_time
        this.prep_time = prep_time
        this.directions = directions
        this.id = id
        Recipe.all.push(this)
    }

    static postRecipe(recipeData) {
        let formData = {
            "title": recipeData.title.value,
            "status": recipeData.status = 'Like',
            "cook_time": recipeData.cook_time.value,
            "prep_time": recipeData.prep_time.value,
            "directions": recipeData.directions.value,
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
                let newObj = new Recipe(recipeObj.title, recipeObj.status, recipeObj.cook_time, recipeObj.prep_time, recipeObj.directions, recipeObj.id)
                user.recipes.push(newObj)
                clearRecipeDivs()
                user.renderRecipes()
                clearForm()
            })
    }

    render() {
        let h2 = document.createElement('h2')
        h2.innerHTML = `<strong>${this.title}</strong>`

        let h4 = document.createElement('h4')
        h4.innerHTML = `<strong>Cook Time: ${this.cook_time} minutes<br>Prep Time: ${this.prep_time} minutes</strong>`
        
        let tbody = document.createElement('tbody')
        tbody.innerHTML = `${this.directions}`
        
        let deleteBtn = document.createElement('button')
        deleteBtn.setAttribute('class', 'delete-recipe-btn')
        deleteBtn.innerText = 'Delete'
        deleteBtn.addEventListener('click', event => this.deleteRecipeHandler(event, this))
        
        let unlikeBtn = document.createElement('button')
        unlikeBtn.setAttribute('class', 'unlike-recipe-btn')
        unlikeBtn.innerText = 'Unlike!'
        unlikeBtn.addEventListener('click', event => this.unlikeHandler(event, this))

        let likeBtn = document.createElement('button')
        likeBtn.setAttribute('class', 'like-recipe-btn')
        likeBtn.innerText = 'Like'
        likeBtn.addEventListener('click', event => this.likeHandler(event, this))

        let p = document.createElement('p')
        p.setAttribute('class', 'recipe-status')
        p.innerHTML = `${this.status}`

        if (p.innerHTML === 'Not liked') {
            p.style.color = 'red'
            likeBtn.style.display = 'none'
        } else {
            p.style.color = 'green'
            unlikeBtn.style.display = 'none'
        }

        let divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')
        divCard.setAttribute('id', `${this.id}`)
        divCard.append(h2, h4, p, tbody, unlikeBtn, likeBtn, deleteBtn)
        recipeCollection.append(divCard)
    }

    static renderRecipes(recipes) {
        recipes.forEach(recipeObj => {
            let newObj = new Recipe(recipeObj.title, recipeObj.status, recipeObj.cook_time, recipeObj.prep_time, recipeObj.directions, recipeObj.id)
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

    unlikeHandler() {
        let cardIns = event.target.parentNode
        cardIns.querySelector('.like-recipe-btn').style.display = 'block'
        event.preventDefault()

        let toggleLikeBtn = event.target.style.display = 'none'

        let likeUpdate = event.target.previousElementSibling.previousElementSibling
        likeUpdate.innerHTML = 'Liked!'
        likeUpdate.style.color = 'green'

        fetch(`${Api.RECIPES_URL}/${this.id}`), {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'status': likeUpdate.textContent
            })
        }
        .then(parseJSON)
        .then(newStatus => {
            likeUpdate
        })
    }

    likeHandler() {
        let likeStatus = event.target.previousElementSibling.previousElementSibling
        likeStatus.innerHTML = 'Not liked'
        likeStatus.style.color = 'none'

        let toggleUnlikeBtn = event.target.previousElementSibling
        toggleUnlikeBtn.style.display = 'block'

        let toggleLikeBtn = event.target.style.display = 'none'
        event.preventDefault()

        fetch(`${Api.RECIPES_URL}/${this.id}`), {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'status': likeStatus.textContent
            })
        }
        .then(parseJSON)
        .then(newStatus => {
            likeStatus
        })
    }
}