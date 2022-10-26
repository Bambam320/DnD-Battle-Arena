class Character < ActiveRecord::Base
  has_many :spells

  def self.delete_table 
    self.destroy_all
  end

end