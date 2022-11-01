require 'pry'

class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  # grabs a hash from the Character model including the characters and their associated spells and all spells set as json
  get '/characters' do
    get_hash = Character.create_me_an_everything_hash
    get_hash.to_json
  end

  # This creates a new character by passing params to the class method which returns the new character from the database and provides it back to react as a json
  post '/create_a_character' do
    new_character = Character.create_me_a_brand_new_character(params)
    new_character.to_json
  end

  # This post to the spells table will create a spell on its own or create a spell and attach it to the provided character id by association
  # This returns a hash that includes all characters and spells and provides them back to the Spells.js component
  post '/spells/:charid' do
    created_spell = Spell.create_me_a_spell(params)
    if params[:charid].to_i > 0
      character = Character.find(params[:charid])
      character.spells << created_spell
    end
    get_hash = Character.create_me_an_everything_hash
    get_hash.to_json
  end
  
  # finds the character provided by react and shovels the existing spell into that characters spells array
  patch '/spells/:charid' do
    character = Character.find(params[:charid])
    character.spells << Spell.find(params[:id])
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
  
  # This will delete a character by finding its id and deleting that record
  delete '/characters/:id' do
    character = Character.find(params[:id])
    character.destroy
    character.to_json
  end

end