require 'pry'

class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  get '/characters' do
    # binding.pry
    all_characters = Character.all
    all_characters.each { |char| char.update(spell_points: char.spells.map { |spell| spell["level"] * spell["damage"] * spell["description"].length/8 }.reduce(:+))}
    all_characters.to_json(include: :spells)
  end

  post '/create_a_character' do
    
  end
  
end