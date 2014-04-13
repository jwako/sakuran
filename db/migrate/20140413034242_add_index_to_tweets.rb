class AddIndexToTweets < ActiveRecord::Migration
  def change
  	add_index :tweets, :lat
  	add_index :tweets, :lon
  	add_index :tweets, :tweet_created_at
  end
end
