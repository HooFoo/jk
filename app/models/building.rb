# frozen_string_literal: true

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

require "zlib"

class Building < ApplicationRecord
  has_many :advertisements

  geocoded_by :address
  reverse_geocoded_by :latitude, :longitude, address: :full_address
  after_validation :geocode, if: ->(obj){ obj.address.present? and obj.address_changed? }
  after_validation :reverse_geocode
  after_create :generate_hash

  private

  def generate_hash
    update uid: Zlib.adler32(full_address)
  end
end
