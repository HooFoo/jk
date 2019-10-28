# frozen_string_literal: true

module Api
  module V1
    module Buildings
      class AdvertisementPolicy < ApplicationPolicy
        def index?
          true
        end

        def show?
          true
        end

        def create?
          !user.nil?
        end

        def update?
          record.user = user
        end

        def destroy?
          record.user = user
        end
      end
    end
  end
end
