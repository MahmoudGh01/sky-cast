import toWeather from "../toWeather"

describe("toWeather", () => {
  it("converts clear weather code", () => {
    expect(toWeather(0)).toBe("Clear")
  })

  it("converts cloudy weather codes", () => {
    expect(toWeather(1)).toBe("Cloudy")
    expect(toWeather(2)).toBe("Cloudy")
  })

  it("converts overcast weather code", () => {
    expect(toWeather(3)).toBe("Overcast")
  })

  it("converts fog weather codes", () => {
    expect(toWeather(45)).toBe("Fog")
    expect(toWeather(48)).toBe("Fog")
  })

  it("converts light rain codes", () => {
    expect(toWeather(51)).toBe("LightRain")
    expect(toWeather(61)).toBe("LightRain")
    expect(toWeather(80)).toBe("LightRain")
    expect(toWeather(56)).toBe("LightRain")
    expect(toWeather(66)).toBe("LightRain")
  })

  it("converts moderate rain codes", () => {
    expect(toWeather(53)).toBe("ModerateRain")
    expect(toWeather(63)).toBe("ModerateRain")
    expect(toWeather(81)).toBe("ModerateRain")
  })

  it("converts heavy rain codes", () => {
    expect(toWeather(55)).toBe("HeavyRain")
    expect(toWeather(65)).toBe("HeavyRain")
    expect(toWeather(82)).toBe("HeavyRain")
    expect(toWeather(57)).toBe("HeavyRain")
    expect(toWeather(67)).toBe("HeavyRain")
  })

  it("converts light snow codes", () => {
    expect(toWeather(71)).toBe("LightSnow")
    expect(toWeather(77)).toBe("LightSnow")
    expect(toWeather(85)).toBe("LightSnow")
  })

  it("converts moderate snow code", () => {
    expect(toWeather(73)).toBe("ModerateSnow")
  })

  it("converts heavy snow codes", () => {
    expect(toWeather(75)).toBe("HeavySnow")
    expect(toWeather(86)).toBe("HeavySnow")
  })

  it("throws error for invalid weather code", () => {
    expect(() => toWeather(999)).toThrow("toWeather: Invalid input.")
  })
})
