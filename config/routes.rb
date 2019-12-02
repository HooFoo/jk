# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1, defaults: { format: :json } do
      resources :address, only: [:index]
      resources :buildings, only: [:index, :show] do
        scope module: :buildings do
          resources :advertisements
        end
      end

      mount_devise_token_auth_for 'User', at: 'auth'
    end
  end


  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
end
