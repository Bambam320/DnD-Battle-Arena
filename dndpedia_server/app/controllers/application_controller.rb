require 'pry'

class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  get '/characters' do
    all_characters = Character.all
    all_characters.each { |char| char.update(spell_points: char.spells.map { |spell| spell["level"] * spell["damage"] * spell["description"].length/8 }.reduce(:+))}
    character_json = all_characters.as_json(include: :spells)
    all_spells = Spell.all
    spells_json = all_spells.as_json
    get_hash = {}
    get_hash[:characters] = character_json
    get_hash[:spells] = spells_json
    get_hash.to_json
  end

  # create methods in the model files so that most of this is handled there, also ruby will return all the characters to make it easier on react
  post '/create_a_character' do
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
      avatar_url: params[:avatar_url]
    )
    new_character.to_json
  end

  # this will get a character id params and if its 0, no character will be udpated, just a spell will be created and the spell and characters will be updated
  # if the character id is an actual number, then the character will be updated as well and both spell and characters will be updated.
  post '/spells' do
    character = Character.find(10)
    character.spells.create(
      name: params[:name],
      description: params[:description],
      range: params[:range],
      material: params[:material],
      duration: params[:duration],
      casting_time: params[:casting_time],
      level: params[:level],
      damage: params[:damage],
      character_id: params[:character_id]
    )
    character.spells.last.to_json
  end

  delete '/characters/:id' do
    character = Character.find(params[:id])
    character.destroy
    character.to_json
  end

  # the patch request from react provides an id through params and the character class update method changes the values for the appropriate attributes
  patch '/characters/:id' do
    character = Character.find(params[:id])
    character.update(
      name: params[:name],
      pet: params[:pet],
      level: params[:level],
      city: params[:city],
      avatar_url: params[:avatar_url],
      language: params[:language]
    )
    Character.all.to_json
  end

  # update a character with a new pre-existing spell and returns all characters
  patch '/spells/:character_id/:spell_id' do
    character = Character.find(params[:character_id])
    character.spells << Spells.find(params[:spell_id])
    character.to_json
  end
  
end