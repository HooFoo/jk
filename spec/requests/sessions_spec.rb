require 'rails_helper'

RSpec.describe 'POST /login', type: :request do
  let(:user) { create(:user) }
  let(:url) { '/api/v1/login' }
  let(:params) do
    {
      user: {
        email: user.email,
        password: user.password
      }
    }
  end

  context 'when params are correct' do
    let(:decoded_token) do
      token_from_request = response.headers['Authorization'].split(' ').last
      JWT.decode(token_from_request, ENV['DEVISE_JWT_SECRET_KEY'], true)
    end

    before do
      post url, params: params
    end

    it 'returns 200' do
      expect(response).to have_http_status(200)
    end

    it 'returns JTW token in authorization header' do
      expect(response.headers['Authorization']).to be_present
    end

    it 'returns valid JWT token' do
      expect(decoded_token.first['sub']).to be_present
    end
  end

  context 'when login params are incorrect' do
    before { post url }

    it 'returns unathorized status' do
      expect(response.status).to eq 401
    end
  end
end

RSpec.describe 'DELETE /logout', type: :request do
  let(:url) { '/api/v1/logout' }

  it 'returns 204, no content' do
    delete url
    expect(response).to have_http_status(204)
  end
end
