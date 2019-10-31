# frozen_string_literal: true

module Api
  module V1
    module Buildings
      module Advertisements
        class UpdateForm < ApplicationForm
          def params
            @params.require(:advertisement).permit(:title, :description, :price, :currency, :due_in, :category)
          end
        end
      end
    end
  end
end
