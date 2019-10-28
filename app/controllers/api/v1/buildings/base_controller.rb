# frozen_string_literal: true

module Api
  module V1
    module Buildings
      class BaseController < Api::V1::BaseController
        private

        def building
          @building = Building.find params[:building_id]
        end
      end
    end
  end
end
