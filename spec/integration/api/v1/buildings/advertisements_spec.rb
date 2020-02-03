# frozen_string_literal: true

require 'swagger_helper'

describe 'Advertisements API' do
  let(:building) { create :building }
  let(:user) { create :user }
  let(:advertisement) { create :advertisement, building: building, user: user }
  let(:building_id) { building.id }

  path '/api/v1/buildings/{building_id}/advertisements/{id}' do
    get 'Retrieves the advertisement by provided id' do
      tags 'Advertisements'
      produces 'application/json'
      parameter name: :id, in: :path, type: :integer, required: true
      parameter name: :building_id, in: :path, type: :integer, required: true

      response '200', 'advertisement returned' do
        schema type: :object,
               properties: {
                 data: {
                   type: :object,
                   properties: {
                     id: {type: :string},
                     type: {type: :string},
                     attributes: {
                       type: :object,
                       title: {type: :string},
                       full_address: {type: :string},
                       description: {type: :number},
                       price: {type: :number},
                       currency: {type: :string},
                       due_in: {type: :string},
                       catrgory: {type: :string}
                     }
                   }
                 }
               }
        let(:id) { advertisement.id }
        let(:building_id) { building.uid }
        run_test!
      end
    end
  end
end
