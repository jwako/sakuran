class AddColumnPrefectureAndCityToTweets < ActiveRecord::Migration
  def change
  	add_column :tweets, :prefecture, :string
  	add_column :tweets, :city, :string
  end
end
