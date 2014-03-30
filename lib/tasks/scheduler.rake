require "uri"
require "sakuran"

namespace :scheduler do

  desc "Get sakura tweets"
  task :search_sakura_tweets => :environment do
  	include Sakuran::Estimator

    logger = Logger.new("log/sakura_tweets_#{Time.now.strftime('%Y_%m_%d_%H_%M')}.log")
    start_time = Time.now
    logger.info "search_sakura_tweets at #{start_time}"
    
		client = Twitter::REST::Client.new do |config|
		  config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
		  config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
		  config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
		  config.access_token_secret = ENV['TWITTER_ACCESS_TOKEN_SECRET']
		end

		client.search("#桜2014 OR 桜 OR サクラ開花 filter:links", 
			count: 100, 
			result_type: "mixed", 
			lang: 'ja', 
			since_id: Tweet.last.tweet_id,
			include_entities: true
		).sort{|a, b| a.id <=> b.id}.collect do |result|
			if result.geo.present?
				_url_ = result.media[0].blank? ? "" : result.media[0].media_url.to_s
				geo = Sakuran::Geo.new(:latitude => result.geo.lat, :longitude => result.geo.long, :lang => :ja)
				tweet = Tweet.new(
					tweet_id: result.id,
					text: result.text,
					user_id: result.user.id,
					screen_name: result.user.screen_name,
					tweet_created_at: result.created_at,
					lat: result.geo.lat,
					lon: result.geo.long,
					url: _url_,
					rating: rate_of(result.text),
					prefecture: geo.prefecture,
					city: geo.city
				)
				tweet.save!
				logger.info "ID: #{result.id}"
			end
		end
		
    end_time = Time.now
    logger.info "successfully done at #{end_time}"
    logger.info "Duration: #{(end_time - start_time).round(1)} sec."
  end

end