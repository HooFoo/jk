# frozen_string_literal: true

module Api
  module V1
    module Buildings
      module Advertisements
        class IndexForm < ApplicationForm
          def initialize(params)
            @params = params
          end

          def params
            return {} if @params[:q].blank?

            @params.require(:q).permit(:category)
          end
        end
      end
    end
  end
end
