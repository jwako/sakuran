class AdminController < ApplicationController

  def index
  	no = params[:page].blank? ? 1 : params[:page].to_i
  	@tweets = Tweet.order(:id).page(no).per(100)
  end

  def create
  	@tweets = Tweet.find(params[:ids])
  	@tweets.each do |tweet|
  		tweet.destroy
  	end
  	redirect_to admin_index_path
  end
end
