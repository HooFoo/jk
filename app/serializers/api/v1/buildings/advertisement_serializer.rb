module Api
  module V1
    module Buildings
      class AdvertisementSerializer < ActiveModel::Serializer
        include PolicySerializer

        attributes :id, :title, :description, :price, :currency, :due_in, :category, :img

        def img
          if object.photos.length > 0
            Rails.application.routes.url_helpers.url_for(object.photos.first)
          end
        end

        #policy AdvertisementPolicy, policies: %i[update destroy]
      end
    end
  end
end
