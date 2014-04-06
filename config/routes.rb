Sakuran::Application.routes.draw do

  mount Base::API => '/'

  root :to => 'top#show'

	resources :admin, :only => [:index, :create]

end
