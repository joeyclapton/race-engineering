import React from "react";

import { fireEvent, render, screen } from "@testing-library/react";

import Timer from "./index";

describe("Timer component", () => {
  test("Timer component starts and pauses correctly", async () => {
    render(<Timer />);
    const playButton = screen.getByLabelText("Play");
    const pauseButton = screen.getByLabelText("Pause");
    const hours = await screen.findByTestId("hour");
    const minutes = await screen.findByTestId("minutes");
    const seconds = await screen.findByTestId("seconds");

    // Click play button and check if timer is running
    fireEvent.click(playButton);
    expect(hours.textContent).toBe("00");
    expect(minutes.textContent).toBe("00");
    expect(seconds.textContent).toBe("00");

    // Click pause button and check if timer is paused
    fireEvent.click(pauseButton);
    const pausedSeconds = seconds.textContent;
    expect(hours.textContent).toBe("00");
    expect(minutes.textContent).toBe("00");

    // Wait for 2 seconds and check if timer is still paused
    setTimeout(() => {
      expect(seconds.textContent).toBe(pausedSeconds);
    }, 2000);
  });
});
