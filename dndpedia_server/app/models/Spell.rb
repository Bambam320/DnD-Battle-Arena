class Spell < ActiveRecord::Base
  belongs_to :character

  # Creates a spell with only parameters that can be user entered from Spells.js then returns the newly created spell, if no character is provided to this new
  # spell then its id will be set to null in the table, if a character id is provided then it will be added to the spell
  def self.create_me_a_spell params
    if params[:char_id].to_i == 0
      params[:character_id] = nil
    else
      params[:character_id] = params[:char_id]
    end
    puts 'from spell.rb params', params
    new_spell = Spell.create(
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
    new_spell
  end

end