# frozen_string_literal: true

class Friend < ApplicationRecord
  has_many :posts, dependent: :destroy
end
