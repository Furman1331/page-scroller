class State {
    container = null;
    sections = null;
    activeSlide = 0;
    activeSection = 0;
    scrollMode = 'automatic';
    scrollingSpeed = 700;
    transitionTimingFunction = 'ease';
    isDebug = false;
    isScrolling = false;
    isResizing = false;
    isInitialized = false;
    isWheelEnabled = true;
    isKeyboardEnabled = true;
    isTouchEnabled = true;
    slidesIdentifyAttribute = 'page-scroller-slide';
    isAllowToScrollThroughSlides = true;
}
const state = new State();

class Callback {
    onSectionChange;
    onBeforeSectionChange;
}
const callback = new Callback();

var ClassName;
(function (ClassName) {
    ClassName["html"] = "page-scroller-enabled";
    ClassName["body"] = "page-scoller-body";
    ClassName["container"] = "page-scroller-wrapper";
    ClassName["section"] = "page-scroller-section";
    ClassName["sectionWithSlides"] = "page-scroller-section-with-slides";
    ClassName["activeSection"] = "page-scroller-section-active";
    ClassName["slide"] = "page-scroller-slide";
})(ClassName || (ClassName = {}));
var SlideClassName;
(function (SlideClassName) {
    SlideClassName["wrapper"] = "page-scroller-slide-wrapper";
    SlideClassName["active"] = "page-scroller-slide-active";
})(SlideClassName || (SlideClassName = {}));

function initializeDOM() {
    const htmlElement = document.querySelector('html');
    htmlElement.classList.add(ClassName.html);
    const bodyElement = document.querySelector('body');
    bodyElement.classList.add(ClassName.body);
    state.container.classList.add(ClassName.container);
    const transition = `transform ${state.scrollingSpeed}ms ${state.transitionTimingFunction}`;
    state.container.style.transition = transition;
    prepareSections();
    state.scrollMode === 'automatic' ? prepareScrollModeAutomaticDOM() : prepareScrollModeManualDOM();
}
function prepareSections() {
    state.sections = Array.from(state.container.children).map((element) => {
        const section = element;
        const childrens = Array.from(section.children);
        const foundSlides = childrens.filter((slide) => slide.hasAttribute(state.slidesIdentifyAttribute));
        foundSlides.forEach((slide) => slide.classList.add(ClassName.slide));
        if (!foundSlides.length)
            return { element: section, slides: null };
        const container = preapreSectionForSlides(section, foundSlides);
        const slides = { container, elements: foundSlides };
        return { element: section, slides };
    });
    state.sections.forEach((section) => section.element.classList.add(ClassName.section));
}
function preapreSectionForSlides(section, slides) {
    const wrapperElement = document.createElement('div');
    wrapperElement.classList.add(SlideClassName.wrapper);
    const transition = `transform ${state.scrollingSpeed}ms ${state.transitionTimingFunction}`;
    wrapperElement.style.transition = transition;
    wrapperElement.style.width = `${slides.length * 100}%`;
    slides.forEach((slide) => {
        slide.style.width = `${100 / slides.length}%`;
        wrapperElement.appendChild(slide);
    });
    const containerElement = document.createElement('div');
    containerElement.classList.add(ClassName.sectionWithSlides);
    containerElement.appendChild(wrapperElement);
    section.appendChild(containerElement);
    return wrapperElement;
}
function destroyDOM() {
    const htmlElement = document.querySelector('html');
    htmlElement.classList.remove(ClassName.html);
    const bodyElement = document.querySelector('body');
    bodyElement.classList.remove(ClassName.body);
    state.container.classList.remove(ClassName.container);
    state.container.style.transition = '';
    state.container.style.transform = 'none';
    state.container.style.webkitTransform = 'none';
    state.sections.forEach((section) => section.element.classList.remove(ClassName.section));
}
function prepareScrollModeAutomaticDOM() {
    const bodyElement = document.querySelector('body');
    bodyElement.style.overflow = 'hidden';
    bodyElement.style.height = '100%';
    const htmlElement = document.querySelector('html');
    htmlElement.style.overflow = 'hidden';
    htmlElement.style.height = '100%';
    const transition = `transform ${state.scrollingSpeed}ms ${state.transitionTimingFunction}`;
    state.container.style.transition = transition;
}
function prepareScrollModeManualDOM() {
    const bodyElement = document.querySelector('body');
    bodyElement.style.overflow = 'auto';
    bodyElement.style.height = 'initial';
    const htmlElement = document.querySelector('html');
    htmlElement.style.overflow = 'auto';
    htmlElement.style.height = 'initial';
    state.container.style.transition = '';
    state.container.style.transform = 'none';
    state.container.style.webkitTransform = 'none';
}

function useLogger() {
    function info(message) {
        if (state.isDebug)
            console.log(createMessage(message, 'info'));
    }
    function error(message) {
        if (state.isDebug)
            console.error(createMessage(message, 'error'));
    }
    function warn(message) {
        if (state.isDebug)
            console.warn(createMessage(message, 'warn'));
    }
    function createMessage(message, type) {
        return `[Page-Scroller]${type ? `[${type.toUpperCase()}]` : ''}: ${message}`;
    }
    return { info, error, warn, createMessage };
}

const focusableElementsString = `a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], summary:not([disabled]), [contenteditable]`;
function isUserUsingInput() {
    const activeElement = document.activeElement;
    const supportedElements = ['input', 'textarea'];
    return supportedElements.includes(activeElement.tagName.toLowerCase());
}
function getAverageFromArray(array, number) {
    const last = array.slice(Math.max(array.length - number, 0));
    const sum = last.reduce((acc, curr) => acc + curr, 0);
    return Math.ceil(sum / number);
}

function changeSectionOrSlideByDirection(direction) {
    if (isAllowToChangeSlide(direction)) {
        changeSlideByDirection(direction === 'down' ? 'right' : 'left');
        return;
    }
    changeSectionByDirection(direction);
}
function changeSlideByDirection(direction) {
    if (state.isScrolling)
        return;
    state.isScrolling = true;
    const currentSlideIndex = state.activeSlide;
    state.activeSlide = direction === 'right' ? currentSlideIndex + 1 : currentSlideIndex - 1;
    changeSlide(currentSlideIndex, state.activeSlide);
}
function changeSectionByDirection(direction) {
    if (state.isScrolling)
        return;
    state.isScrolling = true;
    const currentSectionIndex = state.activeSection;
    if (!isAllowToChangeSection(direction))
        return (state.isScrolling = false);
    state.activeSection = direction === 'down' ? currentSectionIndex + 1 : currentSectionIndex - 1;
    changeSection(currentSectionIndex, state.activeSection);
}
function changeSectionBySpecificIndex(index) {
    if (state.isScrolling)
        return;
    state.isScrolling = true;
    const currentSectionIndex = state.activeSection;
    if (!isAllowToChangeByIndex(index))
        return (state.isScrolling = false);
    state.sections[currentSectionIndex].element.classList.remove(ClassName.activeSection);
    state.activeSection = index;
    changeSection(currentSectionIndex, state.activeSection);
}
function reAdjustCurrentSection() {
    if (state.scrollMode === 'manual')
        return;
    const sectionOffset = state.sections[state.activeSection].element.offsetTop;
    const transform = `translate3d(0px, -${sectionOffset}px, 0px)`;
    state.container.style.transform = transform;
    state.container.style.webkitTransform = transform;
}
function changeSection(previousIndex, nextIndex) {
    emitter.emit(EmitterEvents.onBeforeSectionChange, { beforeIndex: previousIndex, afterIndex: nextIndex });
    state.sections[previousIndex].element.classList.remove(ClassName.activeSection);
    const sectionOffset = state.sections[nextIndex].element.offsetTop;
    const transform = `translate3d(0px, -${sectionOffset}px, 0px)`;
    state.container.style.transform = transform;
    state.container.style.webkitTransform = transform;
    state.sections[nextIndex].element.classList.add(ClassName.activeSection);
    setTimeout(() => {
        state.isScrolling = false;
        emitter.emit(EmitterEvents.onSectionChange, { beforeIndex: previousIndex, afterIndex: nextIndex });
    }, 700);
}
function changeSlide(previousIndex, nextIndex) {
    emitter.emit(EmitterEvents.onBeforeSlideChange, { beforeIndex: previousIndex, afterIndex: nextIndex });
    const activeSection = state.sections[state.activeSection];
    activeSection.slides.elements[previousIndex]?.classList.remove(SlideClassName.active);
    const slideOffset = activeSection.slides.elements[nextIndex].offsetLeft;
    const transform = `translate3d(-${slideOffset}px, 0px, 0px)`;
    activeSection.slides.container.style.transform = transform;
    activeSection.slides.container.style.webkitTransform = transform;
    state.sections[state.activeSection].slides.elements[nextIndex].classList.add(SlideClassName.active);
    setTimeout(() => {
        state.isScrolling = false;
        emitter.emit(EmitterEvents.onSlideChange, { beforeIndex: previousIndex, afterIndex: nextIndex });
    }, state.scrollingSpeed);
}
function isAllowToChangeSection(direction) {
    return direction === 'down' ? state.sections.length != state.activeSection + 1 : state.activeSection - 1 !== -1;
}
function isAllowToChangeSlide(direction) {
    if (!state.isAllowToScrollThroughSlides)
        return false;
    const isCurrentSectionHasSlides = state.sections[state.activeSection].slides?.elements.length > 0;
    if (!isCurrentSectionHasSlides)
        return false;
    const slides = state.sections[state.activeSection].slides;
    const isEdgeSlide = direction === 'down' ? state.activeSlide + 1 === slides.elements.length : state.activeSlide - 1 === -1;
    if (isEdgeSlide)
        return false;
    return true;
}
function isAllowToChangeByIndex(index) {
    return index >= 0 && index < state.sections.length;
}

const defaultState = {
    scrollMode: 'automatic',
    scrollingSpeed: 700,
    transitionTimingFunction: 'ease',
    slidesIdentifyAttribute: 'page-scroller-slide',
    isAllowToScrollThroughSlides: false,
    isDebug: false,
    isWheelEnabled: true,
    isKeyboardEnabled: true,
    isTouchEnabled: true,
};
function initializeState(options) {
    state.scrollMode = options.scrollMode ?? defaultState.scrollMode;
    state.scrollingSpeed = options.scrollingSpeed ?? defaultState.scrollingSpeed;
    state.transitionTimingFunction = options.transitionTimingFunction ?? defaultState.transitionTimingFunction;
    state.isDebug = options.isDebug ?? defaultState.isDebug;
    state.isWheelEnabled = options.isWheelEnabled ?? defaultState.isWheelEnabled;
    state.isKeyboardEnabled = options.isKeyboardEnabled ?? defaultState.isKeyboardEnabled;
    state.isTouchEnabled = options.isTouchEnabled ?? defaultState.isTouchEnabled;
    state.slidesIdentifyAttribute = options.slidesIdentifyAttribute ?? defaultState.slidesIdentifyAttribute;
    state.isAllowToScrollThroughSlides = options.isAllowToScrollThroughSlides ?? defaultState.isAllowToScrollThroughSlides;
}
function destroyState() {
    state.container = null;
    state.sections = null;
    state.activeSlide = 0;
    state.activeSection = 0;
    state.transitionTimingFunction = defaultState.transitionTimingFunction;
    state.scrollingSpeed = defaultState.scrollingSpeed;
    state.slidesIdentifyAttribute = defaultState.slidesIdentifyAttribute;
    state.isAllowToScrollThroughSlides = defaultState.isAllowToScrollThroughSlides;
    state.isDebug = defaultState.isDebug;
    state.isScrolling = false;
    state.isInitialized = false;
    state.isWheelEnabled = defaultState.isWheelEnabled;
    state.isKeyboardEnabled = defaultState.isKeyboardEnabled;
    state.isTouchEnabled = defaultState.isTouchEnabled;
}
function initializeCallbacks(options) {
    if (options.onSectionChange) {
        callback.onSectionChange = options.onSectionChange;
        emitter.on(EmitterEvents.onSectionChange, (event) => callback.onSectionChange(event));
    }
    if (options.onBeforeSectionChange) {
        callback.onBeforeSectionChange = options.onBeforeSectionChange;
        emitter.on(EmitterEvents.onBeforeSectionChange, (event) => callback.onBeforeSectionChange(event));
    }
}
function destroyCallbacks() {
    callback.onSectionChange = () => { };
    emitter.off(EmitterEvents.onSectionChange);
    callback.onBeforeSectionChange = () => { };
    emitter.off(EmitterEvents.onBeforeSectionChange);
}

const logger$5 = useLogger();
function onInitialize(options) {
    logger$5.info('Initializing Page Scroller...');
    if (options) {
        initializeState(options);
        initializeCallbacks(options);
    }
    initializeDOM();
    registerEvents();
    registerEmitterEvents();
    state.isInitialized = true;
    logger$5.info('Initialized Page Scroller.');
}
function onDestroy() {
    logger$5.warn('Destroying Page Scroller...');
    destroyDOM();
    destroyEvents();
    destroyEmitterEvents();
    destroyState();
    destroyCallbacks();
    state.isInitialized = false;
    logger$5.warn('Destroyed Page Scroller.');
}

let scrollingTimeout;
let scrollings = [];
const logger$4 = useLogger();
/**
 * Registers the wheel event listener on the document body.
 */
function registerWheelEvent() {
    logger$4.info('Wheel event registered');
    document.body.addEventListener('wheel', wheelEventHandler);
}
/**
 * Removes the wheel event listener from the document body.
 */
function destroyWheelEvent() {
    logger$4.info('Wheel event registered');
    document.body.removeEventListener('wheel', wheelEventHandler);
}
function wheelEventHandler(event) {
    logger$4.info('Wheel event detected');
    clearTimeout(scrollingTimeout);
    scrollingTimeout = setTimeout(() => {
        scrollings = [];
    }, 200);
    const scrollValue = -event.deltaY || event.detail;
    const direction = getScrollDirection(scrollValue);
    if (scrollings.length > 100) {
        scrollings.shift();
    }
    scrollings.push(Math.abs(scrollValue));
    if (!checkIsAccelerating())
        return;
    return changeSectionOrSlideByDirection(direction);
}
function checkIsAccelerating() {
    const avarageFromEnd = getAverageFromArray(scrollings, 5);
    const avarageFromMid = getAverageFromArray(scrollings, 50);
    return avarageFromEnd >= avarageFromMid;
}
/**
 * Determines the scroll direction based on the WheelEvent.
 * @param event - The WheelEvent object.
 * @returns The scroll direction, either "up" or "down".
 */
function getScrollDirection(value) {
    const delta = Math.max(-1, Math.min(1, value));
    return delta < 0 ? 'down' : 'up';
}

const logger$3 = useLogger();
let focusElementCollation = null;
/**
 * Registers the keyboard event listeners for keyup and keydown events.
 */
function registerKeyboardEvents() {
    document.addEventListener('keydown', keyDownEventHandler);
    emitter.on(EmitterEvents.onSectionChange, onSectionChangeHandler);
}
/**
 * Removes the keyboard event listeners for keyup and keydown events.
 */
function destroyKeyboardEvents() {
    document.removeEventListener('keydown', keyDownEventHandler);
    emitter.off(EmitterEvents.onSectionChange);
}
/**
 * Hanldes the keydown event and changes the section based on the key pressed.
 * @param event KeyboardEvent - The keyboard event.
 * @returns void
 */
function keyDownEventHandler(event) {
    logger$3.info('Keydown event detected');
    const key = event.key;
    if (isUserUsingInput())
        return;
    switch (key) {
        case ' ':
        case 'ArrowDown':
        case 'PageDown':
            changeSectionOrSlideByDirection('down');
            break;
        case 'ArrowUp':
        case 'PageUp':
            changeSectionOrSlideByDirection('up');
            break;
        case 'ArrowRight':
            changeSlideByDirection('right');
        case 'ArrowLeft':
            changeSlideByDirection('left');
        case 'End':
            changeSectionBySpecificIndex(state.sections.length - 1);
            break;
        case 'Home':
            changeSectionBySpecificIndex(0);
            break;
        case 'Tab':
            onTabPress(event);
            break;
    }
}
/**
 * Make sure that the tab key will only focus elements within the current section.
 * Prevent page break when the tab key is pressed.
 * @param event - The keyboard event.
 */
function onTabPress(event) {
    const isShiftPressed = event.shiftKey;
    const activeElement = document.activeElement;
    const focusableElements = getFocusableElements(state.sections[state.activeSection].element);
    const isFirstFocusableInSection = activeElement === focusableElements[0];
    const isLastFocusableInSection = activeElement === focusableElements[focusableElements.length - 1];
    const shouldChangeSection = (isShiftPressed && isFirstFocusableInSection) || (!isShiftPressed && isLastFocusableInSection);
    if (shouldChangeSection) {
        event.preventDefault();
        const direction = isShiftPressed && isFirstFocusableInSection ? 'up' : 'down';
        focusElementCollation = direction === 'up' ? 'last' : 'first';
        changeSectionOrSlideByDirection(direction);
    }
}
/**
 * Focuses the first or last focusable element within the current section while changing the section by tag key
 */
function onSectionChangeHandler() {
    if (!focusElementCollation)
        return;
    const focusableElements = getFocusableElements(state.sections[state.activeSection].element);
    focusableElements[focusElementCollation === 'first' ? 0 : focusableElements.length - 1].focus();
    focusElementCollation = null;
}
function getFocusableElements(parent) {
    return [].slice
        .call(parent.querySelectorAll(focusableElementsString))
        .filter((element) => element.getAttribute('tabindex') !== '-1' && element.offsetParent !== null);
}

const logger$2 = useLogger();
function registerTouchEvents() {
    document.addEventListener('touchstart', onTouchStartHandler);
    state.container.addEventListener('touchmove', onTouchMoveHandler, { passive: false });
}
function destroyTouchEvents() {
    document.removeEventListener('touchstart', onTouchStartHandler);
    state.container.removeEventListener('touchmove', onTouchMoveHandler);
}
let touchStartCoordinates = {};
function onTouchStartHandler(event) {
    const coordinates = getEventCoordinated(event);
    touchStartCoordinates = {
        x: coordinates.x,
        y: coordinates.y,
    };
}
function onTouchMoveHandler(event) {
    logger$2.info('Touch move event detected');
    const coordinates = getEventCoordinated(event);
    const isVerticalMovementEnought = Math.abs(coordinates.y - touchStartCoordinates.y) > (window.innerHeight / 100) * 5;
    const direction = touchStartCoordinates.y > coordinates.y ? 'down' : 'up';
    if (isVerticalMovementEnought)
        changeSectionOrSlideByDirection(direction);
}
function getEventCoordinated(event) {
    return {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY,
    };
}

const logger$1 = useLogger();
let timeout;
let isResizing = false;
function registerResizeEvents() {
    onResizeHandler();
    window.addEventListener('resize', onResizeHandler);
}
function destroyResizeEvents() {
    resizeHandler();
    clearTimeout(timeout);
    window.removeEventListener('resize', onResizeHandler);
}
function onResizeHandler() {
    logger$1.info('Resize event has been triggered.');
    if (!isResizing) {
        resizeHandler();
    }
    isResizing = true;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        resizeAction();
        isResizing = false;
    }, 400);
}
function resizeAction() {
    state.isResizing = true;
    resizeHandler();
    reAdjustCurrentSection();
}
function resizeHandler() {
    const height = window ? window.innerHeight : document.documentElement.offsetHeight;
    setSectionsSize(height);
}
function setSectionsSize(height) {
    state.sections.forEach((section) => (section.element.style.height = `${height}px`));
}

/**
 * Registers the events for the page scroller.
 */
function registerEvents() {
    if (state.scrollMode === "manual")
        return;
    state.isWheelEnabled && registerWheelEvent();
    state.isKeyboardEnabled && registerKeyboardEvents();
    state.isTouchEnabled && registerTouchEvents();
    registerResizeEvents();
}
/**
 * Destroys the events for the page scroller.
 */
function destroyEvents() {
    destroyKeyboardEvents();
    destroyWheelEvent();
    destroyTouchEvents();
    destroyResizeEvents();
}

var EmitterEvents;
(function (EmitterEvents) {
    EmitterEvents["onSectionChange"] = "onSectionChange";
    EmitterEvents["onBeforeSectionChange"] = "onBeforeSectionChange";
    EmitterEvents["onSlideChange"] = "onSlideChange";
    EmitterEvents["onBeforeSlideChange"] = "onBeforeSlideChange";
    EmitterEvents["onPageScrollStatusChanged"] = "onPageScrollStatusChanged";
    EmitterEvents["onPageScrollModeAutomatic"] = "onPageScrollModeAutomatic";
    EmitterEvents["onPageScrollModeManual"] = "onPageScrollModeManual";
})(EmitterEvents || (EmitterEvents = {}));
function mitt(all) {
    all = all || new Map();
    return {
        all,
        on(type, handler) {
            const handlers = all.get(type);
            if (handlers) {
                handlers.push(handler);
            }
            else {
                all.set(type, [handler]);
            }
        },
        off(type, handler) {
            const handlers = all.get(type);
            if (handlers) {
                if (handler) {
                    handlers.splice(handlers.indexOf(handler) >>> 0, 1);
                }
                else {
                    all.set(type, []);
                }
            }
        },
        emit(type, evt) {
            let handlers = all.get(type);
            if (handlers) {
                handlers.slice().map((handler) => {
                    handler(evt);
                });
            }
            handlers = all.get('*');
            if (handlers) {
                handlers.slice().map((handler) => {
                    handler(type, evt);
                });
            }
        },
    };
}
const emitter = mitt();

function registerEmitterEvents() {
    emitter.on(EmitterEvents.onPageScrollModeAutomatic, () => {
        prepareScrollModeAutomaticDOM();
        registerEvents();
    });
    emitter.on(EmitterEvents.onPageScrollModeManual, () => {
        prepareScrollModeManualDOM();
        destroyEvents();
    });
}
function destroyEmitterEvents() {
    emitter.off(EmitterEvents.onPageScrollModeManual);
    emitter.off(EmitterEvents.onPageScrollModeAutomatic);
}

const isManualScrollingMode = () => state.scrollMode === 'manual';
const isAutomaticScrollingMode = () => state.scrollMode === 'automatic';
function changeScrollingMode(mode) {
    if (state.scrollMode === mode)
        return;
    state.scrollMode = mode;
    emitter.emit(mode === 'automatic' ? EmitterEvents.onPageScrollModeAutomatic : EmitterEvents.onPageScrollModeManual);
}
const getActiveSection = () => state.activeSection;

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "html.page-scroller-enabled, .page-scroller-enabled body {\n    margin: 0;\n    padding: 0;\n    -webkit-tap-highlight-color: rgba(0,0,0,0);\n}\n\n.page-scoller-body {\n    height: 100%;\n    position: relative;\n}\n\n.page-scroller-wrapper {\n    height: 100%;\n    width: 100%;\n    position: relative;\n}\n\n.page-scroller-section {\n    height: 100%;\n    display: block;\n    position: relative;\n    box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n}\n\n.page-scroller-section-with-slides {\n    z-index: 1;\n    height: 100%;\n    overflow: hidden;\n    position: relative;\n    -webkit-transition: all .3s ease-out;\n    transition: all .3s ease-out;\n}\n\n.page-scroller-slide-wrapper {\n    height: 100%;\n    display: flex;\n    float: left;\n    position: relative;\n}\n";
styleInject(css_248z);

const logger = useLogger();
function usePageScroller(options) {
    function initPageScroller(selector) {
        logger.info('Initializing page scroller...');
        if (state.isInitialized)
            throw new Error(logger.createMessage('Page scroller is already initialized.'));
        if (selector === undefined)
            throw new Error(logger.createMessage('Please provide a valid selector.'));
        state.container = document.querySelector(selector);
        if (!state.container)
            throw new Error(logger.createMessage('Container not found. Please provide a valid selector.'));
        onInitialize(options);
    }
    return { initPageScroller, changeSectionByDirection, changeSectionBySpecificIndex };
}

export { changeScrollingMode, changeSectionByDirection, changeSectionBySpecificIndex, changeSectionOrSlideByDirection, changeSlideByDirection, getActiveSection, isAutomaticScrollingMode, isManualScrollingMode, onDestroy, usePageScroller };
//# sourceMappingURL=index.esm.mjs.map
