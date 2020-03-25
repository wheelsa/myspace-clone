# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  serialize :liked_posts, Array

  def self.all_posts(ids)
    ids = ids.empty? ? [0] : ids
  end

  def self.liked(ids)
    ids = ids.empty? ? [0] : ids
    Post.where('id IN (?)', ids)
  end
end
