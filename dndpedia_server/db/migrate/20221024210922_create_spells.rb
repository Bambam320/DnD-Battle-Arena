class CreateSpells < ActiveRecord::Migration[6.1]
  def change
    create_table :spells do |t|
      t.string :name
      t.string :description
      t.string :range
      t.string :material
      t.string :duration
      t.string :casting_time
      t.string :classes
      t.integer :level
      t.integer :damage
      t.integer :character_id
      t.timestamps
    end
  end
end
