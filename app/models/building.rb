# frozen_string_literal: true
require "zlib"

class Building < ApplicationRecord
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
