# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::BuildingsController, type: :controller do
  let(:building) { create :building }

  describe 'GET #index' do
    let(:params) do
      {
        sw_lat: building.latitude + 1,
        sw_lng: building.longitude + 1,
        ne_lat: building.latitude - 1,
        ne_lng: building.longitude - 1
      }
    end

    it 'returns buildings in boundary' do
      get :index, params: params

      expect(response).to be_successful
    end
  end

  describe 'GET #show' do
    it 'returns existing building' do
      get :show, params: {id: building.id}

      expect(response).to be_successful
    end
  end
end
