class PhotosController < ApplicationController
	layout 'photo'

  def show
  	@tweet = Tweet.find(params[:id])
  end

end
