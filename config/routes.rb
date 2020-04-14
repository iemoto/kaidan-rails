Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'boards#index'
  namespace :api, format: 'json' do
    resources :rates, only: [:index]
  end
end
