# frozen_string_literal: true

require 'swagger_helper'

describe 'Buildings API' do
  path '/api/v1/buildings/{id}' do
    get 'Retrieves the building by provided id' do
      tags 'Buildings'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true

      response '200', 'Building returned' do
        schema type: :object,
               properties: {
                 data: {
                   type: :object,
                   properties: {
                     id: {type: :string},
                     type: {type: :string},
                     attributes: {
                       type: :object,
                       address: {type: :string},
                       full_address: {type: :string},
                       latitude: {type: :number},
                       longitude: {type: :number},
                       uid: {type: :string}
                     }
                   }
                 }
               }
        let(:id) { create(:building).id }
        run_test!
      end
    end
  end
end
