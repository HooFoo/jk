module Api
  module V1
    module Buildings
      class AdvertisementSerializer < ActiveModel::Serializer
        include PolicySerializer

        attributes :id, :title, :description, :price, :currency, :due_in, :category

        #policy AdvertisementPolicy, policies: %i[update destroy]
      end
    end
  end
end
