class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
    	t.integer :tweet_id
    	t.string :text
    	t.integer :user_id
    	t.string :screen_name
    	t.date :tweet_created_at
    	t.decimal :lat, :precision => 13, :scale => 10
    	t.decimal :lon, :precision => 13, :scale => 10
    	t.string :url
    	t.integer :rating
      t.timestamps
    end

    add_index :tweets, :tweet_id
    add_index :tweets, :user_id
    add_index :tweets, :rating
  end
end
