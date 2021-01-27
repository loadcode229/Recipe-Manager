class UserSerializer

    def initialize(user_object)
        @user = user_object
    end

    def to_serialized_json
        options = {
            include: {
                recipes: {
                    only: [:title, :status, :prep_time, :cook_time, :directions, :id, :user_id]
                }
            },
            except: [:updated_at],
        }
        @user.to_json(options)
    end
end