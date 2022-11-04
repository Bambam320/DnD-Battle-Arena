class Character < ActiveRecord::Base
  has_many :spells

  # deletes all records in one go
  def self.delete_table 
    self.destroy_all
  end

  # grabs all characters with their associated spells and updates each characters spell points. It then returns all the characters
  def self.create_me_a_character_hash_with_spells
    all_characters = Character.all
    all_characters.each { |char| char.update(spell_points: char.spells.map { |spell| spell["level"] * spell["damage"] * spell["description"].length/8 }.reduce(:+))}
    character_json = all_characters.as_json(include: :spells)
    character_json
    # all_spells = Spell.all
    # spells_json = all_spells.as_json
    # get_hash = {}
    # get_hash[:characters] = character_json
    # get_hash[:spells] = spells_json
    # get_hash
  end


  ##
  # This will take the information from params and distribute it through the keys of the new character object, filling in data from the Faker gem where its needed.
  # Then it will return the new character from the database
  def self.create_me_a_brand_new_character params
    level = params[:level]
    melee_weapon = Faker::Games::DnD.melee_weapon
    melee_weapon_source = RestClient.get "https://www.dnd5eapi.co/api/equipment/#{melee_weapon.downcase.gsub(" ", "-")}"
    melee_weapon_json = JSON.parse(melee_weapon_source)
    melee_weapon_power = melee_weapon_json["range"].values[0] * melee_weapon_json["weight"]
    ranged_weapon_location = Faker::Games::DnD.ranged_weapon
    ranged_weapon = ranged_weapon_location == "Crossbow" || ranged_weapon_location == "Boomerang" ? "Blowgun" : ranged_weapon_location
    ranged_weapon_source = RestClient.get "https://www.dnd5eapi.co/api/equipment/#{ranged_weapon.downcase.gsub(" ", "-")}"
    ranged_weapon_json = JSON.parse(ranged_weapon_source)
    ranged_weapon_power = ranged_weapon_json["range"].values[1] * ranged_weapon_json["weight"]
    new_character = Character.create(
      name: params[:name],
      alignment: Faker::Games::DnD.alignment,
      background: Faker::Games::DnD.background,
      city: params[:city],
      c_lass: Faker::Games::DnD.klass,
      language: params[:language],
      melee_weapon: melee_weapon,
      pet: params[:pet],
      race: Faker::Games::DnD.race,
      ranged_weapon: ranged_weapon,
      level: level,
      attack_points: ranged_weapon_power * melee_weapon_power * level.to_i,
      spell_points: 0,
      avatar_url: params[:avatar_url],
    )
    new_character << Spell.find(1)
    new_character << Spell.find(2)
    new_character
  end

end