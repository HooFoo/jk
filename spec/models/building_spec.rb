require 'rails_helper'

RSpec.describe Building, type: :model do
  describe 'callbacks' do
    let(:attributes) { attributes_for :building }
    let(:building) { described_class.create attributes }

    it 'creates hash' do
      expect(building.uid).not_to be_nil
      expect(building.uid).to be_an_instance_of(String)
    end
  end
end
