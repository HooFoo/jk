# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'json'
require 'open-uri'

MOCKS_PATH = File.join Rails.root, 'app', 'frontend', 'public', 'mockdata', 'api', 'v1'

def read_data(filename)
  JSON.parse(File.read(File.join(MOCKS_PATH, filename)))
end

# create user

user = User.create(email: 'user@example.com', password: '123456', password_confirmation: '123456')

# import buildings and adds data
buildings_data = read_data 'buildings.json'
ads_data = read_data 'chat-advertisements.json'

buildings_data['data'].each do |data|
  attributes = data['attributes']
  attributes[:full_address] = attributes.delete('full-address')
  attributes.delete('full-address')
  attributes.delete('id')
  building = Building.create(attributes)
  ads_data['data'].each do |ad_data|
    attributes = ad_data['attributes']
    attributes[:due_in] = attributes.delete('due-in')
    attributes[:building_id] = building.id
    attributes.delete('id')
    attributes.delete('editable')
    attributes.delete('createdDate')
    attributes[:user_id] = user.id
    img = attributes.delete('img')
    advertisement = Advertisement.create(attributes)

    if img.present?
      file = open(img)
      advertisement.photos.attach(io: file, filename: "advertisement-#{advertisement.id}.jpg")
    end
  end
end

# import categories

cats_data = read_data 'chat-categories.json'
cats_data['data'].each do |cat|
  name = cat['attributes']['name']
  Category.create(name: name)
end
