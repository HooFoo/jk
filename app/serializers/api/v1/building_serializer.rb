module Api
  module V1
    class BuildingSerializer < ActiveModel::Serializer
      attributes :id, :address, :latitude, :longitude, :uid

      def address
        object.full_address
      end
    end
  end
end

