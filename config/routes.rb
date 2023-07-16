Rails.application.routes.draw do
  get 'feed/index'
  resources :posts
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#index"
  get "/search", to: "home#search"
  get "/explore", to: "home#explore"
  get "/profile", to: "home#profile"
  get "/notifications", to: "home#notifications"
  get "/messages", to: "home#messages"
  get "/create", to: "home#create"
end
