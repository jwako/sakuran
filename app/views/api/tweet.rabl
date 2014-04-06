collection @tweets, :root => false, :object_root => false
attributes :id, :text, :lat, :lon, :url, :screen_name, :tweet_created_at
node(:tweet_url) { |t| URI.extract(t.text)[0] }

