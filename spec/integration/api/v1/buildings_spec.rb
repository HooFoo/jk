require 'swagger_helper'

describe 'Buildings API' do
  path '/api/v1/buildings/:id' do
    get 'Retrieves the building by provided id' do
      tags 'Buildings'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true

      response '200', 'Building returned' do
        schema type: :object,
          properties: {
            address: { type: :string },
            full_address: { type: :string },
            latitude: { type: :decimal },
            longitude: { type: :decimal },
            uid: { type: :string },
          }

        xit
      end
    end
  end
end


