# frozen_string_literal: true

module Api
  module V1
    class BuildingsController < BaseController
      def index
        form = Buildings::IndexForm.new params
        buildings = Building.within_bounding_box(*form.params)

        render json: buildings
      end

      def show
        building = Building.find params[:id]

        render json: building
      end
    end
  end
end
