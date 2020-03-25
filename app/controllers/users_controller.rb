# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    render json: User.all
  end

  def show
    render json: User.find(params[:id])
  end

  def new; end

  def edit; end
end
