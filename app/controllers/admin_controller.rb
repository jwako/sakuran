class AdminController < ApplicationController

  def index
  	no = params[:page].blank? ? 1 : params[:page].to_i
  	@tweets = Tweet.order(:id).page(no).per(100)
  end

  def show
  	@tweet = Tweet.find(params[:id])
  	@tweet.destroy
  	redirect_to admin_index_path
  end
end
