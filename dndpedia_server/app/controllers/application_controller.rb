class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'

  get '/characters' do
    all_characters = Character.all
    all_characters.to_json
  end
end