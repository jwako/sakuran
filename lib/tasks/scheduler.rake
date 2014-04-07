require "uri"
require "sakuran"

namespace :scheduler do

	def available_service?(result)
		is_twitter?(result) || is_instagram?(result)
	end

	def is_twitter?(result)
		if result.media[0].present? && result.media[0].expanded_url.present? && result.media[0].expanded_url.to_s.include?("twitter.com")
			return true
		else
			return false
		end
	end

	def is_instagram?(result)
		if result.urls[0].present? && result.urls[0].expanded_url.present? && result.urls[0].expanded_url.to_s.include?("instagram.com")
			return true
		else
			return false
		end
	end

	def get_image_url(result)
		return result.media[0].media_url.to_s if is_twitter?(result)
		return result.urls[0].expanded_url.to_s + "media" if is_instagram?(result)
		return ""
	end

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

		client.search("#桜2014 OR #桜 OR #花見 filter:links", 
			count: 100, 
			result_type: "mixed", 
			lang: 'ja', 
			since_id: Tweet.last.tweet_id,
			include_entities: true
		).sort{|a, b| a.id <=> b.id}.collect do |result|
			if result.geo.present? && available_service?(result)
				geo = Sakuran::Geo.new(:latitude => result.geo.lat, :longitude => result.geo.long, :lang => :ja)
				tweet = Tweet.new(
					tweet_id: result.id,
					text: result.text,
					user_id: result.user.id,
					screen_name: result.user.screen_name,
					tweet_created_at: result.created_at,
					lat: result.geo.lat,
					lon: result.geo.long,
					url: get_image_url(result),
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

	desc "Remove duplicated tweets"
  task :remove_duplicated_tweets => :environment do
  	ids = Tweet.all.uniq.pluck(:tweet_id)
  	ids.each do |tweet_id|
  		tweets = Tweet.where(tweet_id: tweet_id).order("id DESC")
  		tweets.first.destroy if tweets.count > 1
  	end
  end

  desc "Remove 404 photos"
  task :remove_404_tweets => :environment do
  	Tweet.unchecked.order(:id).limit(50).each do |tweet|
      begin
	      res = fetch(tweet.url)
	      if res.code == "200"
	      	tweet.update_attribute(:checked, true)
	      else
	      	tweet.destroy
	      end
	    rescue => e
	      puts "[XXX] #{tweet.url}\n\t#{e}"
	    end
		end
	end

	def fetch(url, limit=10)
    raise ArgumentError, 'HTTP Redirect is too deep!' if limit == 0
    res = Net::HTTP.get_response(URI.parse(url))
    case res
    when Net::HTTPSuccess
    	res
    when Net::HTTPRedirection
    	fetch(res['location'], limit - 1)
    else
    	res
    end
	end

end