# frozen_string_literal: true

module Api
  module V1
    class BuildingsController < BaseController
      def show
        building = Building.find params[:id]

        render json: building
      end
    end
  end
end
