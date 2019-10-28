# frozen_string_literal: true

module Api
  module V1
    class BaseController < ApplicationController
      private

      def render_result(result)
        if result.success?
          render json: result.data
        else
          render json: ErrorSerializer.new(result).to_json, status: :unprocessable_entity
        end
      end

      def policy(record)
        policies[record] ||= "#{controller_path.classify}Policy".constantize.new(pundit_user, record)
      end
    end
  end
end
