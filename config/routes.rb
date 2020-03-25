# frozen_string_literal: true

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  resources :users
  get '/users/api/posts' => 'api/posts#index'

  namespace :api do
    resources :posts, only: %i[index update getUser create destroy show]
    get 'my_posts', to: 'posts#my_posts'
    resources :friends, only: %i[index update]
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
