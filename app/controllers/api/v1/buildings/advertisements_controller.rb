# frozen_string_literal: true

module Api
  module V1
    module Buildings
      class AdvertisementsController < Api::V1::Buildings::BaseController
        before_action :authenticate_user!, only: %i[create update destroy]

        def index
          form = Advertisements::IndexForm.new params
          ads = building.advertisements.where form.params
          authorize ads

          render json: ads, each_serialiser: AdvertisementSerializer,
                 serialization_options: {current_user: current_user}
        end

        def show
          ad = advertisement
          authorize ad

          render_advertisement ad
        end

        def create
          form = Advertisements::UpdateForm.new params
          ad = building.advertisements.new form.params
          ad.user = current_user

          authorize ad

          ad.save

          render_advertisement ad
        end

        def update
          form = Advertisements::UpdateForm.new params
          ad = advertisement
          authorize ad

          ad.update form.params

          render_advertisement ad
        end

        def destroy
          ad = advertisement
          authorize ad

          ad.destroy

          render_advertisement ad
        end

        private

        def advertisement
          @advertisement ||= building.advertisements.find params[:id]
        end

        def render_advertisement(adv)
          render json: adv, serialization_options: {current_user: current_user}
        end
      end
    end
  end
end
