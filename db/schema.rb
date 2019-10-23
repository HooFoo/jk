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

ActiveRecord::Schema.define(version: 2019_10_22_133511) do

  create_table "buildings", force: :cascade do |t|
    t.string "address"
    t.string "full_address"
    t.decimal "latitude"
    t.decimal "longitude"
    t.string "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["address"], name: "index_buildings_on_address"
    t.index ["full_address"], name: "index_buildings_on_full_address"
    t.index ["latitude", "longitude"], name: "index_buildings_on_latitude_and_longitude"
    t.index ["uid"], name: "index_buildings_on_uid"
  end

end
