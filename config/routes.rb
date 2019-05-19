Rails.application.routes.draw do
  get 'sub_todos/index'

  get 'sub_todos/create'

  get 'sub_todos/update'

  get 'sub_todos/destroy'

  scope '/api/v1' do
    resources :todos
  end

  root 'pages#index'
  match '*path', to: 'pages#index', via: :all
end
