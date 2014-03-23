# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140323033907) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "tweets", force: true do |t|
    t.integer  "tweet_id",         limit: 8
    t.string   "text"
    t.integer  "user_id",          limit: 8
    t.string   "screen_name"
    t.date     "tweet_created_at"
    t.decimal  "lat",                        precision: 13, scale: 10
    t.decimal  "lon",                        precision: 13, scale: 10
    t.string   "url"
    t.integer  "rating"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tweets", ["rating"], name: "index_tweets_on_rating", using: :btree
  add_index "tweets", ["tweet_id"], name: "index_tweets_on_tweet_id", using: :btree
  add_index "tweets", ["user_id"], name: "index_tweets_on_user_id", using: :btree

end
