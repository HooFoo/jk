# frozen_string_literal: true

module PolicySerializer
  def policy(policy_class, attributes)
    attribute :policy, attributes[:attribute_options] || {} do
      policy = policy_class.new(instance_options[:current_user], object)
      attributes[:policies].each_with_object(reasons: {}) do |action, hash|
        result = policy.result(action)
        hash["can_#{action}"] = result.successful?
        hash[:reasons]["can_#{action}"] = {name: result.exception.kind, message: result.exception.message} if result.failed?
      end.as_json
    end
  end
end
