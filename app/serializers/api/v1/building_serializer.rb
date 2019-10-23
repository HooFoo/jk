module Api
  module V1
    class BuildingSerializer < ActiveModel::Serializer
      attributes :id, :address, :full_address, :latitude, :longitude, :hash
    end
  end
end

