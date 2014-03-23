require 'spec_helper'

describe Sakuran::Estimator do
	include Sakuran::Estimator

	describe "#rate_of" do
		it { rate_of("つぼみ").should eq 1 }
		it { rate_of("5分咲").should eq 5 }
		it { rate_of("関係ない文字列").should eq 0 }
	end

	
end