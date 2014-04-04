# -*- encoding: UTF-8 -*-
module TwitterClient
	class API < Grape::API
		formatter :json, Grape::Formatter::Rabl

		desc "Returns books based on browse node id from Amazon"
		get '/tweets', :rabl => "item" do
			ne_lat = params[:ne_lat].blank? ? "" : params[:ne_lat].to_f
			sw_lat = params[:sw_lat].blank? ? "" : params[:sw_lat].to_f
			ne_lng = params[:ne_lng].blank? ? "" : params[:ne_lng].to_f
			sw_lng = params[:sw_lng].blank? ? "" : params[:sw_lng].to_f
			if ne_lat.present? && sw_lat.present? && ne_lng.present? && sw_lng.present?
				@tweets = Tweet.where(lat: sw_lat..ne_lat, lon: sw_lng..ne_lng).sample(50)
			else
				@tweets = Tweet.all.sample(50)
			end
		end
	end
end