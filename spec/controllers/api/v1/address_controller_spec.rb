require 'rails_helper'

RSpec.describe Api::V1::AddressController, type: :controller do
  let(:building) { create :building }

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

end
