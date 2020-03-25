# frozen_string_literal: true

class Api::FriendsController < ApplicationController
  before_action :authenticate_user!
  def index
    render json: Friend.all
  end

  def update; end
end
