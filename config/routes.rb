Rails.application.routes.draw do
  get 'users/new', to: "users#new", as: "new_user"
  get 'signup', to: "users#new"
  resources :users, only: [:create]

  resources :products
  root to: "products#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
