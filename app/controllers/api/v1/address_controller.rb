# frozen_string_literal: true

module Api
  module V1
    class AddressController < BaseController
      def index
        form = Address::IndexForm.new(params)
        result = Address::ShowService.perform form.params

        render_result result
      end
    end
  end
end
