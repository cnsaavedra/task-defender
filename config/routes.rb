Rails.application.routes.draw do
  get 'todos/index'

  get 'todos/create'

  get 'todos/update'

  get 'todos/destroy'

  root 'pages#index'
  match '*path', to: 'pages#index', via: :all
end
