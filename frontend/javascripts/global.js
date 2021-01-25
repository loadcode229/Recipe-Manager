// Global Variables

const parseJSON = response => response.json()
const addBtn = document.getElementById('new-recipe-btn')
const recipeForm = document.querySelector('.container')
const recipeCollection = document.querySelector("#recipe-collection")
const userRecipesBelongTo = document.getElementById('user-recipe-list')

const userPopUp = document.getElementById('user-pop-up')
const addUserBtn = document.getElementById('add-new-user')
const selectUserBtn = document.getElementById('all-user-options')
const userSelectionPopUp = document.querySelector('.user-selector')
const selectUsers = document.getElementById('user-select')
const selectForm = document.querySelector('.user-selector')
const select = document.querySelector("#select")

let addRecipe = false
let addUser = false
let selectUser = false