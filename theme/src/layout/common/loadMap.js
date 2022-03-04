export class LoadMap {
  constructor(options) {
    const defaultOptions = {
      mapContainerCssSelector: '#map',
      multiMapCssSelector: null,
      centerLatitude: 55.726411,
      centerLong: 37.669361,
      markLatitude: 55.726411,
      markLong: 37.669361,
      apiKey: 'AIzaSyCgqz4HeLO_AGHaQrJ3LkI-svcBqnpqL-4',
      styles: [],
      iconPath: '',
    };
    this.options = { ...defaultOptions, ...options };
    this.mapUrl = `https://maps.googleapis.com/maps/api/js?key=${this.options.apiKey}&amp;&v=weekly;`;
    this.googleMapsObj = null;
    this.mapContainerEl = document.querySelector(this.options.mapContainerCssSelector);
    this.observer = null;
    this.afterInitCallback = null;
    this.multi = false;
  }
  initSingleMap = () => {
    const self = this;
    this.setObserverOnMap();
    this.afterInitCallback = function () {
      const marker = new google.maps.Marker({
        position: {
          lat: Number(self.options.markLatitude),
          lng: Number(self.options.markLong),
        },
        map: self.googleMapsObj,
        icon: self.options.iconPath,
      });
    };
  };
  initMultiMap = () => {
    if (this.mapContainerEl) {
      this.multi = true;
      this.observer = new IntersectionObserver(
        (entries, observer) => {
          this.loadMapScript();
          this.observer.unobserve(this.mapContainerEl);
        },
        { rootMargin: '30%', threshold: 1.0 }
      );
      this.observer.observe(this.mapContainerEl);
    }
  };
  setObserverOnMap = () => {
    this.observer = new IntersectionObserver(
      (entries, observer) => {
        this.loadMapScript();
        this.observer.unobserve(this.mapContainerEl);
      },
      { rootMargin: '30%', threshold: 1.0 }
    );
    this.observer.observe(this.mapContainerEl);
  };
  initMap = () => {
    const self = this;
    self.googleMapsObj = new google.maps.Map(self.mapContainerEl, {
      zoom: 12,
      center: {
        lat: self.options.centerLatitude,
        lng: self.options.centerLong,
      },
      styles: self.options.styles,
    });
    this.afterInitCallback && this.afterInitCallback();
  };
  createMultiMap = () => {
    const self = this;
    const maps = document.querySelectorAll(this.options.multiMapCssSelector);
    console.log(maps);
    Array.prototype.forEach.call(maps, (item) => {
      const latitude = Number(item.getAttribute('data-lat'));
      const longitude = Number(item.getAttribute('data-long'));
      const map = new google.maps.Map(item, {
        zoom: 12,
        center: {
          lat: latitude,
          lng: longitude,
        },
      });
      const marker = new google.maps.Marker({
        position: {
          lat: latitude,
          lng: longitude,
        },
        map: map,
      });
    });
  };
  loadMapScript = () => {
    const self = this;
    const script = document.createElement('script');
    script.onload = function () {
      if (self.multi) {
        self.createMultiMap();
      } else {
        self.initMap();
      }
    };
    script.src = this.mapUrl;
    document.getElementsByTagName('head')[0].appendChild(script);
  };
}
