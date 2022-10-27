class AddPictureColumnToCharacterTable < ActiveRecord::Migration[6.1]
  def change
    add_column :characters, :avatar_url, :string
  end
end
