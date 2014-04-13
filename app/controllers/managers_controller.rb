class ManagersController < ApplicationController

  def show
  end
  
  def create
  	@tweets = Tweet.find(params[:ids])
  	@tweets.each do |tweet|
  		tweet.destroy
  	end
  	redirect_to managers_path
  end
  
end
