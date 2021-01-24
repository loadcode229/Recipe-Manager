class RecipeSerializer
    
    def initialize(recipe_object)
        @recipe = recipe_object
    end

    def to_serialized_json
        options = {
            include: {
                user: {
                    only: [:name]
                }
            },
            except: [:updated_at],
        }
        @recipe.to_json(options)
    end
end 