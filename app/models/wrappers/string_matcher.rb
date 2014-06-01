class StringMatcher
  class << self
    @@matcher = FuzzyStringMatch::JaroWinkler.create(:native)

    ACCEPTED_MIN_MATCH = 0.8

    def getDistance(string1, string2)
      if(string1 && string2)
        @@matcher.getDistance(string1, string2)
      else
        0
      end
    end

    def is_acceptable_distance(string1, string2)
      distance = getDistance(string1.downcase, string2.downcase)
      puts "#{string1} and #{string2} have distance of #{distance}"
      distance > ACCEPTED_MIN_MATCH
    end
  end
end