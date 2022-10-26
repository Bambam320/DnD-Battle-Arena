class CreateCharacter < ActiveRecord::Migration[6.1]
  def change
    create_table :characters do |t|
      t.string :name
      t.string :alignment
      t.string :background
      t.string :city
      t.string :c_lass
      t.string :language
      t.string :melee_weapon
      t.string :pet
      t.string :race
      t.string :ranged_weapon
      t.integer :level
      t.integer :attack_points
      t.integer :spell_points
      t.timestamps
    end
  end
end
