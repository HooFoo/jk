# == Schema Information
#
# Table name: buildings
#
#  id           :bigint           not null, primary key
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

require 'rails_helper'

RSpec.describe Building, type: :model do
  describe 'callbacks' do
    let(:attributes) { attributes_for :building }
    let(:building) { described_class.create attributes }

    it 'creates hash' do
      expect(building.uid).not_to be_nil
      expect(building.uid).to be_an_instance_of(String)
    end
  end
end
