# -*- encoding: UTF-8 -*-
module GraphClient
	class API < Grape::API
		formatter :json, Grape::Formatter::Rabl

		get '/graphs/prefectures', :rabl => "graph" do
			@graph = Hash[*Tweet.pluck(:prefecture).group_by{ |v| v }.flat_map{ |k, v| [k, v.size] }]
		end

		get '/graphs/cities', :rabl => "graph" do
			@graph = Hash[*Tweet.pluck(:city).group_by{ |v| v }.flat_map{ |k, v| [k, v.size] }]
		end

		get '/graphs/dates', :rabl => "graph" do
			@graph = Hash[*Tweet.pluck(:tweet_created_at).group_by{ |v| v }.flat_map{ |k, v| [k, v.size] }]
		end

	end
end