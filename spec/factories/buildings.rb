FactoryBot.define do
  factory :building do
    address { FFaker::Address.city }
    full_address { FFaker::Address.city }
    latitude { FFaker::Geolocation.lat }
    longitude { FFaker::Geolocation.lng }
    uid { FFaker::Guid.guid[0..8] }
  end
end
