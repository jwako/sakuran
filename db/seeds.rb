# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#

Tweet.where("prefecture = ?", "").each do |tweet|
	geo = Sakuran::Geo.new(:latitude => tweet.lat, :longitude => tweet.lon, :lang => :ja)
	tweet.update_attributes!(prefecture: geo.prefecture, city: geo.city)
end

Tweet.where("prefecture = ?", "日本").each do |tweet|
	geo = Sakuran::Geo.new(:latitude => tweet.lat, :longitude => tweet.lon, :lang => :ja)
	tweet.update_attributes!(prefecture: geo.city, city: geo.town)
end