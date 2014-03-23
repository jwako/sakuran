Sakuran::Application.routes.draw do

  mount Base::API => '/'

  root :to => 'top#show'
    
end
