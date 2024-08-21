import { JSDOM } from "jsdom";
import { test, expect, describe, beforeEach } from "@jest/globals";
import Popover from "../Popover";

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.document = dom.window.document;
global.window = dom.window;

describe("Popover", () => {
  let popover;

  beforeEach(() => {
    popover = new Popover();
  });

  test("Popover initialization", () => {
    expect(popover).toBeDefined();
    expect(popover.popovers).toEqual([]);
  });

  test("initElem method", () => {
    const button = document.createElement("button");
    button.style.width = "100px";
    button.style.height = "50px";
    document.body.appendChild(button);

    const id = popover.initElem("Test", "Description", button);
    expect(popover.popovers.length).toEqual(1);
    expect(popover.popovers[0].id).toEqual(id);

    const popoverElem = popover.popovers[0].popoverNode;
    expect(document.body.contains(popoverElem)).toBeTruthy();
    expect(popoverElem.style.top).toBeDefined();
    expect(popoverElem.style.left).toBeDefined();
  });

  test("toggleState method", () => {
    const id = popover._addElement("Test", "Description");
    popover.toggleState(id);
    expect(popover.popovers[0].state).toBeTruthy();
    expect(popover.popovers[0].popoverNode.dataset.state).toEqual("true");

    popover.toggleState(id);
    expect(popover.popovers[0].state).toBeFalsy();
    expect(popover.popovers[0].popoverNode.dataset.state).toEqual("false");
  });

  test("removeElement method", () => {
    const id = popover._addElement("Test", "Description");
    popover.removeElement(id);
    expect(popover.popovers.length).toEqual(0);
  });
});
