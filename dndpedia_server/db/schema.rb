# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_11_14_230929) do

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.string "alignment"
    t.string "background"
    t.string "city"
    t.string "c_lass"
    t.string "language"
    t.string "melee_weapon"
    t.string "pet"
    t.string "race"
    t.string "ranged_weapon"
    t.integer "level"
    t.integer "attack_points"
    t.integer "spell_points"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "avatar_url"
    t.integer "calc_power"
  end

  create_table "spells", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "range"
    t.string "material"
    t.string "duration"
    t.string "casting_time"
    t.string "classes"
    t.integer "level"
    t.integer "damage"
    t.integer "character_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
