# -*- encoding: UTF-8 -*-
module Sakuran
	module Estimator

		KEYWORDS = {
			["咲き始", "つぼみ", "1分咲", "一分咲"] => 1, 
			["2分咲", "二分咲"] => 2, 
			["3分咲", "三分咲"] => 3, 
			["4分咲", "四分咲"] => 4, 
			["5分咲", "五分咲"] => 5, 
			["6分咲", "六分咲"] => 6, 
			["7分咲", "七分咲"] => 7, 
			["8分咲", "八分咲"] => 8, 
			["9分咲", "九分咲"] => 9, 
			["満開"] => 10,
			["散り始"] => 11,
			["散っちゃった"] => 12
		}

		def self.included(base)
	    base.send(:include, Sakuran::Estimator::ControllerMethods)
	  end

	  module ControllerMethods
	  	def rate_of(str)
	  		KEYWORDS.collect do |key, value|
	  			return value if key.any? { |word| str.include?(word) }
	  		end
	  		return 0
	  	end
	  end

	end
end