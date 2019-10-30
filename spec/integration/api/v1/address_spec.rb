# frozen_string_literal: true

require 'swagger_helper'

describe 'Address API' do
  path '/api/v1/address?address={address}' do
    get 'Shows address' do
      tags 'Address'
      produces 'application/json'
      parameter name: :address, in: :path, type: :string, required: true

      response '200', 'address found' do
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

        let(:address) { create(:building).full_address }
        run_test!
      end
    end
  end
end
