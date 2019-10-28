# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::Buildings::AdvertisementsController, type: :controller do
  let(:building) { create :building }
  let(:user) { create :user }
  let(:advertisement) { create :advertisement, building: building, user: user }

  describe 'GET #index' do
    it 'returns existing ads' do
      get :index, params: {building_id: building.id}

      expect(response).to be_successful
    end
  end

  describe 'GET #show' do
    it 'returns existing advertisement' do
      get :show, params: {id: advertisement.id, building_id: building.id}

      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    let(:params) { { advertisement: build(:advertisement).attributes } }

    it 'returns creates new advertisement' do
      sign_in user

      with_building = params.merge({building_id: building.id})
      post :create, params: with_building

      expect(response).to be_successful
    end
  end

  describe 'PATCH #update' do
    let(:params) { { advertisement: build(:advertisement).attributes } }

    it 'returns updated advertisement' do
      sign_in user

      with_building = params.merge({building_id: building.id, id: advertisement.id})
      patch :update, params: with_building

      expect(response).to be_successful
    end
  end

  describe 'DELETE #destroy' do
    let(:deletable) { create(:advertisement, user: user, building: building) }

    it 'destroys advertisement' do
      sign_in user

      delete :destroy, params: {building_id: building.id, id: deletable.id}

      expect(response).to be_successful
    end
  end
end
