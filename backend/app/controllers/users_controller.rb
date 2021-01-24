class UsersController < ApplicationController

    def index
        users = User.all
        render json: UserSerializer.new(users).to_serialized_json
    end

    def show
        user = User.find_by(params[:id])
        render json: UserSerializer.new(user).to_serialized_json
    end

    def create
        user = User.new(user_params)
        user.save
        render json: user
    end

    private

    def user_params 
        params.require(:user).permit(:name)
    end
end
