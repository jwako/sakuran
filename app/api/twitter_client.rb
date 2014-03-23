# -*- encoding: UTF-8 -*-
module TwitterClient
	class API < Grape::API
		formatter :json, Grape::Formatter::Rabl

		desc "Returns books based on browse node id from Amazon"
		get '/tweets', :rabl => "item" do
			@tweets = Tweet.all
		end
	end
end