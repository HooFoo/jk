FactoryBot.define do
  factory :advertisement do
    title { FFaker::Lorem.word }
    description { FFaker::Lorem.paragraph }
    price { 1 }
    currency { 'RUB' }
    due_in { "2019-10-26 14:44:53" }
    category { "other" }
  end
end
