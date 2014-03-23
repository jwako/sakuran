require 'geocoder'

module Sakuran
	class Geo

		attr_accessor :latitude, :longitude, :address

		def initialize(attributes = {})
			Geocoder.configure(:language => attributes[:lang], :units => :km)
			@latitude = attributes[:latitude]
			@longitude = attributes[:longitude]
			@address   = Geocoder.search("#{@latitude},#{@longitude}")
		end

		def prefecture
			@address[0].address_components.reverse[1]["long_name"]
		end

		def city
			@address[0].address_components.reverse[2]["long_name"]
		end

	end
end