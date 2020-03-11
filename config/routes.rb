# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'categories/index'
    end
  end
  namespace :api do
    namespace :v1, defaults: { format: :json } do
      resources :address, only: [:index]
      resources :categories, only: :index
      resources :buildings, only: [:index, :show] do
        scope module: :buildings do
          resources :advertisements
        end
      end
    end
  end

  devise_for :users,
    path: '',
    path_names: {
      sign_in: '/api/v1/login',
      sign_out: '/api/v1/logout',
      registration: '/api/v1/signup'
    },
    controllers: {
      sessions: 'api/v1/sessions',
      registrations: 'api/v1/registrations'
    }
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
end
