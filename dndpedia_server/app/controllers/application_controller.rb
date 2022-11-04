require 'pry'

class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  # grabs an array from the Character model including the characters and their associated spells then return as json
  get '/characters' do
    characters = Character.create_me_a_character_hash_with_spells
    characters.to_json
  end

  # grabs an array of all spells and returns all json
  get '/spells' do
    spells = Spell.all
    spells.to_json
  end

  # This creates a new character by passing params to the class method which returns the new character from the database and provides it back to react as a json
  post '/characters' do 
    new_character = Character.create_me_a_brand_new_character(params)
    new_character.to_json
  end

  # This creates a new character by passing params to the class method which returns the new spell from the database and provides it back to reach as a json
  post '/spells' do
    created_spell = Spell.create_me_a_spell(params)
    created_spell.to_json
  end

  # This post to the spells table will create a spell and attach it to the provided character id by association
  # This returns the newly created spell back to the frontend
  post '/spells/:char_id/characters' do
    character = Character.find(params[:char_id])
    created_spell = Spell.create_me_a_spell(params)
    created_spell.to_json 
  end

  # finds the character provided by react and shovels the existing spell into that characters spells array and returns the new spell including the
  # character id
  patch '/characters/:char_id/spells' do
    character = Character.find(params[:char_id])
    spell = Spell.find(params[:id])
    character.spells << spell
    spell.to_json
  end
  
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
    character.to_json(include: :spells)
  end
  
  # This will delete a character by finding its id and deleting that record
  delete '/characters/:char_id' do
    character = Character.find(params[:char_id])
    character.destroy
  end

end