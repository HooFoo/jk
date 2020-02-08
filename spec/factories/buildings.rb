# == Schema Information
#
# Table name: buildings
#
#  id           :integer          not null, primary key
#  address      :string
#  full_address :string
#  latitude     :decimal(, )
#  longitude    :decimal(, )
#  uid          :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_buildings_on_address                 (address)
#  index_buildings_on_full_address            (full_address)
#  index_buildings_on_latitude_and_longitude  (latitude,longitude)
#  index_buildings_on_uid                     (uid)
#

FactoryBot.define do
  factory :building do
    address { 'New York, NY, USA' }
    full_address { 'New York, NY, USA' }
    latitude { FFaker::Geolocation.lat }
    longitude { FFaker::Geolocation.lng }
    uid { FFaker::Guid.guid[0..8] }
  end
end
