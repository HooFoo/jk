# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  namespace :api do
    namespace :v1, defaults: { format: :json } do
      resources :address, only: [:index]
      resources :buildings, only: [:show]
    end
  end
end
