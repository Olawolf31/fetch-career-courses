import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import CourseList from "./CourseList";
import axios from "axios";

describe("CourseList component", () => {
  it("fetches courses correctly", async () => {
    axios.get = jest.fn();
    //Arrange
    const mockResponse = ["course1", "course2"];
    axios.get.mockResolvedValueOnce({ data: mockResponse });

    render(<CourseList />);

    //Act
    const selectElement = screen.getByPlaceholderText("Select a course");

    fireEvent.change(selectElement, { target: { value: "course1" } });

    //Assert
    expect(selectElement.value).toBe("course1");
  });
  it("renders CareerFoundry Courses", () => {
    //Arrange
    render(<CourseList />);

    //Act
    //..nothing

    //Assert
    expect(screen.getByText("CareerFoundry Courses")).toBeInTheDocument();
    expect(screen.getByText("Select a course")).toBeInTheDocument();
  });
});
