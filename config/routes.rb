Rails.application.routes.draw do
  scope '/api/v1' do
    resources :sub_todos, :as => :subtodos
  end

  scope '/api/v1' do
    resources :todos
  end

  root 'pages#index'
  match '*path', to: 'pages#index', via: :all
end
