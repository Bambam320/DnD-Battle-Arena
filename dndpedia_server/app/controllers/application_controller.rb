require 'pry'

class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  #
  # grabs a hash from the Character model including the characters and their associated spells and all spells set as json
  get '/characters' do
    characters = Character.create_me_a_character_hash_with_spells
    characters.to_json
  end

  get '/spells' do
    spells = Spell.all
    spells.to_json
  end

  # This creates a new character by passing params to the class method which returns the new character from the database and provides it back to react as a json
  post '/characters/new' do
    new_character = Character.create_me_a_brand_new_character(params)
    new_character.to_json
  end

  #
  ###########
  # This post to the spells table will create a spell on its own or create a spell and attach it to the provided character id by association
  # This returns a hash that includes all characters and spells and provides them back to the Spells.js component. It also includes the updated
  post '/spells/:charid/new' do
    puts 'found meeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    created_spell = Spell.create_me_a_spell(params)
    puts 'created spell',        created_spell.name
    if params[:charid].to_i > 0
      character = Character.find(params[:charid])
      character.spells << created_spell
      puts 'this should not be firing but it is'
    end
    created_spell.to_json 
    # get_hash = Character.create_me_an_everything_hash
    # get_hash[:updatedFighter] = character.as_json(include: :spells)
    # get_hash.to_json
  end
  
  #
  ############
  # finds the character provided by react and shovels the existing spell into that characters spells array and returns characters and spells
  # It also provides the character with spells updated as part of the returned hash
  patch '/spells/:charid/update' do
    character = Character.find(params[:charid])
    spell = Spell.find(params[:id])
    character.spells << spell
    spell.to_json
    # get_hash = Character.create_me_an_everything_hash
    # get_hash[:updatedFighter] = character.as_json(include: :spells)
    # get_hash.to_json
    # puts "params[:charid]", params[:charid]
    # puts "params[:id]", params[:id]
    # puts "character.spells.count", character.spells.count
    # puts "spell.name", spell.name
    # puts "character", character
    # puts "character.spells.count", character.spells.count
  end
  
  # the patch request from react provides an id through params and the character class update method changes the values for the appropriate attributes
  # it then returns all the characters back to react with the updated information for the character included
  patch '/characters/:id/update' do
    character = Character.find(params[:id])
    character.update(
      name: params[:name],
      pet: params[:pet],
      level: params[:level],
      city: params[:city],
      avatar_url: params[:avatar_url],
      language: params[:language]
    )
    character.to_json
  end
  
  # This will delete a character by finding its id and deleting that record
  delete '/characters/:id/delete' do
    character = Character.find(params[:id])
    character.destroy
    character.to_json
  end

end