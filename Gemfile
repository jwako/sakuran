source 'https://rubygems.org'

ruby '2.1.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.1.0'

# Use postgresql as the database for Active Record
gem 'pg'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
# gem 'jquery-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

gem 'twitter', '>= 5.8.0'
gem 'grape'
gem 'grape-rabl'

gem "bower-rails", "~> 0.7.1"

gem "geocoder"
gem 'kaminari'

# RSpec
group :test, :development do
  gem "rspec-rails", '~> 2.14.1'
  gem 'factory_girl_rails'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'pry-rails'
  gem 'pry-doc'
  gem 'pry-byebug'
  gem 'quiet_assets'
  gem 'sextant'
  gem 'hirb'
  gem 'hirb-unicode'
  gem "mocha", :require => 'mocha/api'
  gem 'rack-test'
end

# Capybara
group :test do
  gem "capybara", '~> 2.2.1'
  gem 'webmock'
  gem "shoulda-matchers"
  gem 'guard'
  gem 'guard-rspec', require: false
  gem 'guard-spork'
  gem 'spork', '~> 1.0rc'
  gem 'database_cleaner'
  gem 'meta_request', '0.2.1'
  gem 'fuubar'
end

# Use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.1.2'

# Use unicorn as the app server
gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]

group :production do
  gem 'newrelic_rpm'
end
