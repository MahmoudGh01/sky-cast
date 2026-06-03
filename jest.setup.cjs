// Mock React Native modules
jest.mock("react-native", () => {
  return {
    Platform: {
      OS: "ios",
      select: jest.fn((obj) => obj.ios || obj.default),
    },
    StyleSheet: {
      create: jest.fn((styles) => styles),
      flatten: jest.fn((style) => style),
    },
    View: "View",
    Text: "Text",
    TextInput: "TextInput",
    Switch: "Switch",
    ScrollView: "ScrollView",
    Pressable: "Pressable",
  }
})

// Mock expo-router
jest.mock("expo-router", () => ({
  Link: ({ children }) => children,
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}))

// Mock fetch globally
global.fetch = jest.fn()

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
})
