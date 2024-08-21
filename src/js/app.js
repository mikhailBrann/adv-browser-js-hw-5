import "../components/Popover/css/style.css";
import Popover from "../components/Popover/Popover";

document.addEventListener("DOMContentLoaded", () => {
  const popoverBtn = document.querySelector("[data-event-type=popover-click]");
  const popover = new Popover();

  if (popoverBtn) {
    const popoverId = popover.initElem(
      "Popup title",
      "Some popup description window text",
      popoverBtn,
    );
    popoverBtn.addEventListener("click", () => popover.toggleState(popoverId));
  }
});
