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

require 'rails_helper'

RSpec.describe Advertisement, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
