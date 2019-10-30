FactoryBot.define do
  factory :building do
    address { 'New York, NY, USA' }
    full_address { 'New York, NY, USA' }
    latitude { FFaker::Geolocation.lat }
    longitude { FFaker::Geolocation.lng }
    uid { FFaker::Guid.guid[0..8] }
  end
end
