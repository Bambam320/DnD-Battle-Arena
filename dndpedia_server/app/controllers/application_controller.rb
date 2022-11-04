require 'pry'

class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  # grabs an array from the Character model including the characters and their associated spells
  get '/characters' do
    characters = Character.create_me_a_character_hash_with_spells
    characters.to_json
  end

  # grabs an array of all spells
  get '/spells' do
    spells = Spell.all
    spells.to_json
  end


  #
  # characters
  # This creates a new character by passing params to the class method which returns the new character from the database and provides it back to react as a json
  post '/characters' do 
    new_character = Character.create_me_a_brand_new_character(params)
    new_character.to_json
  end






  #
  #
  # write a description
  post '/spells' do
    created_spell = Spell.create_me_a_spell(params)
    created_spell.to_json
  end

  ##
  #characters/:char_id/spells
  # This post to the spells table will create a spell on its own or create a spell and attach it to the provided character id by association
  # This returns the newly created spell back to the frontend
  post '/spells/:char_id/characters' do
    character = Character.find(params[:char_id])
    created_spell = Spell.create_me_a_spell(params)
    puts 'created_spell from controller', created_spell.character_id
    created_spell.to_json 
  end
  
  
  # characters/:char_id/spells
  # finds the character provided by react and shovels the existing spell into that characters spells array and returns the new spell including the
  # character id
  patch '/characters/:char_id/spells' do
    character = Character.find(params[:char_id])
    spell = Spell.find(params[:id])
    character.spells << spell
    spell.to_json
  end
  
  
  
##
  # charcters/:char_id
  # the patch request from react provides an id through params and the character class update method changes the values for the appropriate attributes
  # it then returns all the characters back to react with the updated information for the character included
  patch '/characters/:char_id' do
    character = Character.find(params[:char_id])
    character.update(
      name: params[:name],
      pet: params[:pet],
      level: params[:level],
      city: params[:city],
      avatar_url: params[:avatar_url],
      language: params[:language]
    )
    puts 'character spells from update patch', character.spells
    character.to_json(include: :spells)
  end
  
  # This will delete a character by finding its id and deleting that record
  delete '/characters/:char_id' do
    character = Character.find(params[:char_id])
    character.destroy
  end

end
    








# reusable code from patch '/characters/:charid/spells'
# get_hash = Character.create_me_an_everything_hash
# get_hash[:updatedFighter] = character.as_json(include: :spells)
# get_hash.to_json
# puts "params[:charid]", params[:charid]
# puts "params[:id]", params[:id]
# puts "character.spells.count", character.spells.count
# puts "spell.name", spell.name
# puts "character", character
# puts "character.spells.count", character.spells.count

# reusable code from post '/characters/:charid/spells
# puts 'created spell', created_spell.name
# get_hash = Character.create_me_an_everything_hash
# get_hash[:updatedFighter] = character.as_json(include: :spells)
# get_hash.to_json