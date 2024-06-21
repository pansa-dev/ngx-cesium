import { HtmlCollection } from '../collections';
import { Cartesian2 } from '../../angular-cesium/models/cartesian2';
import { Cartesian3 } from '../../angular-cesium/models/cartesian3';

export class HtmlPrimitive {

  private _scene: any;
  private _show: boolean;
  private _position: Cartesian3;
  private _lastPosition: Cartesian2;
  private _pixelOffset: Cartesian2;
  private _element: HTMLElement;
  private _collection: HtmlCollection;
  private _mapContainer;
  private _preparedUpdateScreenPosition;

  constructor(options: any, collection: HtmlCollection = null) {
    if (typeof options !== 'object') {
      throw new Error('HtmlPrimitive ERROR: invalid html options!');
    }

    this.scene = options.scene;
    this._mapContainer = options.mapContainer;
    this.show = options.show || true;
    this.position = options.position;
    this.pixelOffset = options.pixelOffset;
    this.element = options.element;
    this.collection = collection;
  }

  set scene(scene: any) {
    this._scene = scene;
  }

  set show(show: boolean) {
    this._show = show;

    if (Cesium.defined(this.element)) {
      if (show) {
        this._element.style.display = 'block';
      } else {
        this._element.style.display = 'none';
      }
    }
  }

  get show(): boolean {
    return this._show;
  }

  set position(position: Cartesian3) {
    this._position = position;
  }

  get position(): Cartesian3 {
    return this._position;
  }

  set pixelOffset(pixelOffset: Cartesian2) {
    this._pixelOffset = pixelOffset;
  }

  get pixelOffset(): Cartesian2 {
    return this._pixelOffset;
  }

  set element(element: HTMLElement) {
    this._element = element;

    if (Cesium.defined(element)) {
      this._mapContainer.appendChild(element);
      this._element.style.position = 'absolute';
      this._element.style.zIndex = Number.MAX_VALUE.toString();
    }
  }

  get element(): HTMLElement {
    return this._element;
  }

  set collection(collection: HtmlCollection) {
    this._collection = collection;
  }

  get collection() {
    return this._collection;
  }

  prepareUpdate() {
    if (!Cesium.defined(this._show) || !Cesium.defined(this._element)) {
      return;
    }

    let screenPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this._scene, this._position);

    if (!Cesium.defined(screenPosition)) {
      screenPosition = new Cesium.Cartesian2((-1000), (-1000));
    } else if (Cesium.defined(this._pixelOffset) && Cesium.defined(this._pixelOffset.x) && Cesium.defined(this._pixelOffset.y)) {
      screenPosition.y += this._pixelOffset.y;
      screenPosition.x += this._pixelOffset.x;
    }

    this._preparedUpdateScreenPosition = screenPosition;
  }

  update() {
    if (!this._preparedUpdateScreenPosition) {
      this.prepareUpdate();
    }

    if (this._lastPosition && this._lastPosition.equals(this._preparedUpdateScreenPosition)) {
      return;
    }

    this._element.style.top = `${this._preparedUpdateScreenPosition.y}px`;
    this._element.style.left = `${this._preparedUpdateScreenPosition.x}px`;
    this._lastPosition = this._preparedUpdateScreenPosition;
    this._preparedUpdateScreenPosition = undefined;
  }

  remove() {
    if (this._element) {
      this._element.remove();
    }
  }
}
