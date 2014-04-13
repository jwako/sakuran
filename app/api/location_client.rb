# -*- encoding: UTF-8 -*-
require 'geocoder'

module LocationClient
	class API < Grape::API
		formatter :json, Grape::Formatter::Rabl

		desc "Returns geo code from a location name"
		get '/locations', :rabl => "location" do
			location = params[:location].blank? ? "" : params[:location]
			Geocoder.configure(:language => :ja, :units => :km)
			address = Geocoder.search(location) if location.present?
			@address = address.blank? ? Geocoder.search("東京駅") : address
		end
	end
end