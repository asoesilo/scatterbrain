class StringMatcher
  class << self
    @@matcher = FuzzyStringMatch::JaroWinkler.create(:native)

    ACCEPTED_MIN_MATCH = 0.85

    def getDistance(string1, string2)
      if(string1 && string2)
        @@matcher.getDistance(string1, string2)
      else
        0
      end
    end
  end
end