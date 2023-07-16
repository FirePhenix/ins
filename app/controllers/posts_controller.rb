class PostsController < ApplicationController

    def create
        @post = current_user.posts.build(post_params)

        if @post.save
            render json: { message: "success", fileID: @post.id }, status: :created 
        else
            render json: { error: @post.errors.full_messages.join(", ") }, status: :unprocessable_entity
        end
    end

    def post_params
        params.require(:post).permit(:content,pictures: [])
    end
end
