# frozen_string_literal: true

# == Schema Information
#
# Table name: advertisements
#
#  id          :integer          not null, primary key
#  category    :string
#  currency    :string
#  description :text
#  due_in      :datetime
#  price       :integer
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  building_id :integer
#  user_id     :integer
#
# Indexes
#
#  index_advertisements_on_building_id  (building_id)
#  index_advertisements_on_category     (category)
#  index_advertisements_on_user_id      (user_id)
#


FactoryBot.define do
  factory :advertisement do
    title { FFaker::Lorem.word }
    description { FFaker::Lorem.paragraph }
    price { 1 }
    currency { 'RUB' }
    due_in { '2019-10-26 14:44:53' }
    category { 'other' }
  end
end
