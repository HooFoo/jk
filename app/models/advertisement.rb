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

class Advertisement < ApplicationRecord
  enum category: %i[baby home sport food other work event]

  belongs_to :user
  belongs_to :building

  has_many_attached :photos
end
