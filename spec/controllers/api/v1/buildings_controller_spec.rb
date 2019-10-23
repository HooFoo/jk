require 'rails_helper'

RSpec.describe Api::V1::BuildingsController, type: :controller do
  let(:building) { create :building }

  describe 'GET #show' do
    it 'returns existing building' do
      get :show, params: { id: building.id }

      expect(response).to be_successful
    end
  end
end
