# frozen_string_literal: true

module Api
  module V1
    module Address
      class ShowService < ApplicationService
        attr_reader :params

        def initialize(params)
          @params = params
        end

        def perform
          return error_result errors: { address: 'Must be correct address' } if params[:address].blank?

          address_info = Geocoder.search(params[:address]).first
          building = Building.find_or_create_by(latitude: address_info.latitude, longitude: address_info.longitude)
          success_result data: building
        rescue StandardError => e
          error_result errors: e
        end
      end
    end
  end
end
