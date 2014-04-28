Sakuran::Application.routes.draw do

  mount Base::API => '/'

  root :to => 'top#show'
  resources :photos, only: :show
  
	# resources :admin, :only => [:index, :create]
	# resource :managers, :only => [:show, :create]

end
