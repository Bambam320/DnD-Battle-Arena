puts "🌱 Seeding the spell tables..."

# # spells table seed
spells = RestClient.get "https://www.dnd5eapi.co/api/spells"
spells_hash = JSON.parse(spells)
spells_arr = []
spells_hash["results"].each do |spell|
  spells_arr << spell["index"]
end
spells_arr.each do |spell|
  each_spell = RestClient.get "https://www.dnd5eapi.co/api/spells/#{spell}"
  each_spell_hash = JSON.parse(each_spell)
  Spell.create(
    name: each_spell_hash["name"],
    description: each_spell_hash["desc"][0],
    range: each_spell_hash["range"],
    material: each_spell_hash["material"],
    duration: each_spell_hash["duration"],
    casting_time: each_spell_hash["casting_time"],
    level: each_spell_hash["level"],
    damage: each_spell_hash["desc"].join.length * each_spell_hash["level"],
    classes: each_spell_hash["classes"].map { |c| c["name"] }
  )
end

puts "Spells have been sewn, seeding Characters..."

# # character table seed
characters_count = 20
characters_count.times do
  level = rand(1..10)
  melee_weapon = Faker::Games::DnD.melee_weapon
  melee_weapon_source = RestClient.get "https://www.dnd5eapi.co/api/equipment/#{melee_weapon.downcase.gsub(" ", "-")}"
  melee_weapon_json = JSON.parse(melee_weapon_source)
  melee_weapon_power = melee_weapon_json["range"].values[0] * melee_weapon_json["weight"]
  ranged_weapon_location = Faker::Games::DnD.ranged_weapon
  ranged_weapon = ranged_weapon_location == "Crossbow" || ranged_weapon_location == "Boomerang" ? "Blowgun" : ranged_weapon_location
  ranged_weapon_source = RestClient.get "https://www.dnd5eapi.co/api/equipment/#{ranged_weapon.downcase.gsub(" ", "-")}"
  ranged_weapon_json = JSON.parse(ranged_weapon_source)
  ranged_weapon_power = ranged_weapon_json["range"].values[1] * ranged_weapon_json["weight"]
  Character.create(
    name: Faker::Fantasy::Tolkien.character,
    alignment: Faker::Games::DnD.alignment,
    background: Faker::Games::DnD.background,
    city: Faker::Games::DnD.city,
    c_lass: Faker::Games::DnD.klass,
    language: Faker::Games::DnD.language,
    melee_weapon: melee_weapon,
    pet: Faker::Games::DnD.monster,
    race: Faker::Games::DnD.race,
    ranged_weapon: ranged_weapon,
    level: level,
    calc_power: melee_weapon_power * ranged_weapon_power,
    attack_points: level * melee_weapon_power * ranged_weapon_power,
    spell_points: 0,
    avatar_url: Faker::Avatar.image
  )
end

# # Associate a character with spells
spells_per_character = 6
Character.all.each do |each_character|
  spells_per_character.times do
    spell_num = rand(1..319)
    each_character.spells << Spell.find(spell_num)
  end
end


puts "✅ Done seeding!"
