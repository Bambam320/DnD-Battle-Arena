require 'pry'

class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  # grabs a hash from the Character model including the characters and their associated spells and all spells set as json
  get '/characters' do
    get_hash = Character.create_me_an_everything_hash
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
  post '/spells/:id' do
    created_spell = Spell.create_me_a_spell(params)
    if params[:id].to_i > 0
      character = Character.find(params[:id])
      character.spells << created_spell
    end
    get_hash = Character.create_me_an_everything_hash
    get_hash.to_json
  end

  patch '/spells/:id' do
    puts 'heeeeeeeeeyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy'
    puts params
    # character = Character.find(params[:id])
    # character.spells << Spell.find()
  end

  # This will delete a character by finding its id and deleting that record
  delete '/characters/:id' do
    character = Character.find(params[:id])
    character.destroy
    character.to_json
  end

  # the patch request from react provides an id through params and the character class update method changes the values for the appropriate attributes
  # it then returns all the characters back to react with the updated information for the character included
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
  
end