collection @tweets, :root => false, :object_root => false
attributes :id, :text, :lat, :lon, :url, :screen_name, :tweet_created_at, :prefecture, :city
node(:tweet_url) { |t| URI.extract(t.text)[0] }
child @related_tweets, :object_root => false do
	attributes :id, :text, :lat, :lon, :url, :screen_name, :tweet_created_at
	node(:tweet_url) { |tweet| URI.extract(tweet.text)[0] }
end
