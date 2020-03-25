# frozen_string_literal: true

class Api::PostsController < ApplicationController
  before_action :authenticate_user!
  def index
    render json: Post.all
  end

  def show
    render json: Post.find(params[:id])
  end

  def create
    post = Post.create(post_params)
    render json: post
  end

  def destroy
    Post.destroy(params[:id])
  end

  def update
    post = Post.find(params[:id])
    post.update_attributes(post_params)
    render json: post
  end

  private

  def post_params
    params.require(:post).permit(:user_id, :body, :date)
  end
end
