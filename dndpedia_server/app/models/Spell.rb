class Spell < ActiveRecord::Base
  belongs_to :Character


  #############
  # Creates a spell with only parameters that can be user entered from Spells.js
  # params come from active record post method
  def self.create_me_a_spell params
    if params[:charid].to_i == 0
      params[:character_id] = nil
    end
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
    puts 'new_spell from Spell.rb', new_spell
    new_spell
  end

end