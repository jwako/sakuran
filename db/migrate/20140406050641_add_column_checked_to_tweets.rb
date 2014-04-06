class AddColumnCheckedToTweets < ActiveRecord::Migration
  def change
  	add_column :tweets, :checked, :boolean, :default => false, :null => false
  end
end
