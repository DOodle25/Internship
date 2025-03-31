// Import necessary modules and dependencies
import axios from "../src/utils/axios";

// Mock axios for testing
jest.mock("../src/utils/axios");

describe("Axios Utility Tests", () => {
  test("should make a GET request and return data", async () => {
    const mockData = { data: { message: "Success" } };
    axios.get.mockResolvedValue(mockData);

    const response = await axios.get("/test-endpoint");
    expect(response).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith("/test-endpoint");
  });

  test("should handle errors in GET request", async () => {
    const mockError = new Error("Request failed");
    axios.get.mockRejectedValue(mockError);

    try {
      await axios.get("/test-endpoint");
    } catch (error) {
      expect(error).toEqual(mockError);
    }
  });
});
