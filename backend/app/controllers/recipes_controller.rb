class RecipesController < ApplicationController

    def index
        recipes = Recipe.all
        render json: RecipeSerializer.new(recipes).to_serialized_json
    end

    def show
        recipe = Recipe.find_by(id: params[:id])
        render json: RecipeSerializer.new(recipe).to_serialized_json
    end

    def create
        recipe = Recipe.new(recipe_params)
        users = User.all
        recipe.save
        render json: recipe
    end

    def update
        recipe = Recipe.find_by(id: params[:id])
        recipe.update(recipe_params)
        render json: recipe
    end

    def destroy
        recipe = Recipe.find(params[:id])
        recipe.destroy
        render json: recipe
    end

    private

    def recipe_params
        params.require(:recipe).permit(:title, :prep_time, :cook_time, :directions, :status, :user_id)
    end
end
