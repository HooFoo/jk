# frozen_string_literal: true

# == Schema Information
#
# Table name: jwt_blacklist
#
#  id  :bigint           not null, primary key
#  jti :string           not null
#
# Indexes
#
#  index_jwt_blacklist_on_jti  (jti)
#


FactoryBot.define do
  factory :jwt_blacklist do

  end
end
