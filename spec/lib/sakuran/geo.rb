require 'spec_helper'

describe Sakuran::Geo do

	before do
		WebMock.allow_net_connect!
		@geo = Sakuran::Geo.new(:latitude => 43.1072749100, :longitude => 141.5152981100, :lang => :ja)
	end

	describe ".address" do
		it { @geo.address[0].address_components.reverse[1]["long_name"].should eq "北海道" }
	end

	describe ".prefecture" do
		it { @geo.prefecture.should eq "北海道" }
	end

	describe ".city" do
		it { @geo.city.should eq "江別市" }
	end

end