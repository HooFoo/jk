# == Schema Information
#
# Table name: advertisements
#
#  id          :bigint           not null, primary key
#  category    :string
#  currency    :string
#  description :text
#  due_in      :datetime
#  price       :integer
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  building_id :bigint
#  user_id     :bigint
#
# Indexes
#
#  index_advertisements_on_building_id  (building_id)
#  index_advertisements_on_category     (category)
#  index_advertisements_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (building_id => buildings.id)
#  fk_rails_...  (user_id => users.id)
#

require 'rails_helper'

RSpec.describe Advertisement, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
