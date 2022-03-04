import GLightbox from "glightbox";
import Inputmask from "inputmask";
import SimpleBar from "simplebar";
import "intersection-observer";

document.addEventListener("DOMContentLoaded", function (event) {
  //inputmask init
  const selector = document.querySelectorAll("._js-tel-mask");
  const im = new Inputmask("+7(999)-999-99-99");
  im.mask(selector);
  //navbar
  new NavBar();
  //init simplebar
  const oversizeItems = document.querySelectorAll("._js-simplebar");
  if (oversizeItems.length > 0) {
    Array.prototype.forEach.call(oversizeItems, (item) => {
      new SimpleBar(item, {
        autoHide: false,
      });
    });
  }

  const lightbox = GLightbox({ selector: "._lightbox" });

  const modal = new Modal();
  modal.init();
  //contact maps init
  const contactMaps = document.getElementById("contact-map");
  if (contactMaps) {
    const map = new LoadMap({
      multiMapCssSelector: ".location__map",
      mapContainerCssSelector: "#contact-map",
    });
    map.initMultiMap();
  }
});
