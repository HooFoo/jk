require 'rails_helper'

RSpec.describe 'POST /api/v1/signup', type: :request do
  let(:url) { '/api/v1/signup' }
  let(:params) do
    {
      user: {
        email: 'test_user@example.com',
        password: 'password'
      }
    }
  end
  let(:body) { JSON.parse(response.body) }

  context 'when user is unauthenticated' do
    before { post url, params: params }

    it 'returns 200' do
      expect(response.status).to eq 200
    end

    it 'returns a new user' do
      expect(body['email']).to eq(params[:user][:email])
    end
  end

  context 'when user already exists' do
    before do
      create :user, email: params[:user][:email]
      post url, params: params
    end

    it 'returns bad request status' do
      expect(response.status).to eq 400
    end

    it 'returns validation errors' do
      expect(body['errors'].first['title']).to eq('Bad Request')
    end
  end
end
