Geocoder.configure(lookup: :test, ip_lookup: :test)

Geocoder::Lookup::Test.set_default_stub(
  [
    {
      'coordinates' => [40.7143528, -74.0059731],
      'address' => 'New York, NY, USA',
      'state' => 'New York',
      'state_code' => 'NY',
      'country' => 'United States',
      'country_code' => 'US'
    }
  ]
)
Geocoder::Lookup::Test.add_stub(
    "New York, NY, USA", [
      {
          'coordinates'  => [40.7143528, -74.0059731],
          'address'      => 'New York, NY, USA',
          'state'        => 'New York',
          'state_code'   => 'NY',
          'country'      => 'United States',
          'country_code' => 'US'
      }
    ]
)
