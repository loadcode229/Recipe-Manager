function clearUserDD() {
    document.querySelector("#user-select").innerHTML = ""
}

function clearForm() {
    document.querySelector('.input-text').value = ""
}

function clearNewUserForm() {
    document.querySelector('.user-input-text').value = ""
}

function clearRecipeDivs() {
    recipeCollection.innerHTML = ""
}

function clearNewRecipe() {
    document.querySelector("#select").innerHTML = ""
}

addUserBtn.addEventListener('click', () => {
    addUser = !addUser
    if (addUser) {
        addUserBtn.textContent = "Close"
        userPopUp.style.display = 'block'
        userPopUp.addEventListener('submit', event => {
            event.preventDefault()
            User.postUser(event.target)
        })
    } else {
        addUserBtn.textContent = "Add a new User"
        userPopUp.style.display = 'none'
    }
})

selectUserBtn.addEventListener('click', () => {
    selectUser = !selectUser
    if (selectUser) {
        selectUserBtn.textContent = 'Close'
        selectForm.style.display = 'block'
        selectForm.addEventListener('submit', event => {
            event.preventDefault()
            let userId = event.target.querySelector('#user-select').value
            let chosenUser = User.all.find(chosenUser => userId == chosenUser.id)
            clearRecipeDivs()
            chosenUser.renderRecipes()
        })
    } else {
        selectUserBtn.textContent = "Select your User"
        selectForm.style.display = 'none'
    }
})

addBtn.addEventListener('click', () => {
    addRecipe = !addRecipe
    if (addRecipe) {
        addBtn.textContent = 'Close'
        recipeForm.style.display = 'block'
        recipeForm.addEventListener('submit', event => {
            event.preventDefault()
            Recipe.postRecipe(event.target)
        })
    } else {
        addBtn.textContent = "Add a new Recipe!"
        recipeForm.style.display = 'none'
    }
})

document.addEventListener("DOMContentLoaded", () => {
    Api.fetchUsers().then(user => {
        user.forEach(u => {
            let uu = new User(u.name, u.id)
            u.recipes.forEach(recipe => {
                uu.addRecipe(recipe)
            })
        })
        User.renderUsers()
        User.renderDropDownOptions() 
    })
    addBtn.textContent = 'Add a New Recipe!'
    addUserBtn.textContent = 'Add a New User!'
    selectUserBtn.textContent = 'Select your User!'
})