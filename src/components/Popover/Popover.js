export default class Popover {
  constructor() {
    this.popovers = [];
  }

  _createElem(title, description, id) {
    const popover = document.createElement("div");

    popover.classList.add("popover-element");
    popover.dataset.popoverId = id;
    popover.innerHTML = `
            <div class="popover-title">${title}</div>
            <div class="popover-description">${description}</div>
        `;

    return popover;
  }

  _setElemCoordinate(id, top, left) {
    const popover = this.popovers.find((popover) => popover.id == id);

    if (!popover) {
      return;
    }

    popover.popoverNode.style.top = top - 7 + "px";
    popover.popoverNode.style.left = left + "px";
  }

  _addElement(title, description) {
    const id = performance.now();
    const popoverNode = this._createElem(title, description, id);
    const state = false;

    this.popovers.push({ id, popoverNode, state });
    document.body.append(popoverNode);

    return id;
  }

  initElem(title, description, element) {
    const id = this._addElement(title, description);
    const popover = this.popovers.find((popover) => popover.id == id);
    const left =
      element.offsetLeft +
      element.offsetWidth / 2 -
      popover.popoverNode.offsetWidth / 2;
    const top = element.offsetTop - popover.popoverNode.offsetHeight;

    this._setElemCoordinate(id, top, left);
    return id;
  }

  toggleState(id) {
    const popover = this.popovers.find((popover) => popover.id == id);

    if (!popover) {
      return;
    }

    popover.state = !popover.state;
    popover.popoverNode.dataset.state = popover.state;
  }

  removeElement(id) {
    this.popovers = this.popovers.find((popover) => popover.id != id) ?? [];
  }
}
