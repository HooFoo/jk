module API
  module V1
    class AddressController < Base
      def index
        form = Address::IndexForm.new(params)
        result = Address::ShowService.perform form.params

        render_result result
      end
    end
  end
end
