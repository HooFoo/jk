# frozen_string_literal: true

module Api
  module V1
    module Address
      class IndexForm < ApplicationForm
        def params
          @params.permit(:address)
        end
      end
    end
  end
end
