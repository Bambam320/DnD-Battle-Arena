class Character < ActiveRecord::Base
  has_many :spells

  # deletes all records in one go
  def self.delete_table 
    self.destroy_all
  end

  # grabs all characters with their associated spells and updates the characters spell points. Then grabs all spells and creates a hash
  # with both characters and spells poised as a json then returns the hash
  def self.create_me_an_everything_hash
    all_characters = Character.all
    all_characters.each { |char| char.update(spell_points: char.spells.map { |spell| spell["level"] * spell["damage"] * spell["description"].length/8 }.reduce(:+))}
    character_json = all_characters.as_json(include: :spells)
    all_spells = Spell.all
    spells_json = all_spells.as_json
    get_hash = {}
    get_hash[:characters] = character_json
    get_hash[:spells] = spells_json
    get_hash
  end

end