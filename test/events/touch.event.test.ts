import { state } from "../../src/state/state";
import { initializeTest } from "../utils";
import { registerTouchEvents, destroyTouchEvents, onTouchStartHandler, touchStartCoordinates, getEventCoordinated } from "../../src/events/touch.event";

describe("Touch Events", () => {
    let touchStartHandler: any;
    let touchMoveHandler: any;

    beforeAll(() => {
        initializeTest();
    })

    beforeEach(() => {
        touchStartHandler = jest.fn();
        touchMoveHandler = jest.fn();
        document.addEventListener = jest.fn((event, handler) => {
            if (event === "touchstart") {
                touchStartHandler = handler;
            }
        });

        document.removeEventListener = jest.fn((event) => {
            if (event === "touchstart") {
                touchStartHandler = null;
            }
        });

        state.container.addEventListener = jest.fn((event, handler) => {
            if (event === "touchmove") {
                touchMoveHandler = handler;
            }
        });

        state.container.removeEventListener = jest.fn((event) => {
            if (event === "touchmove") {
                touchMoveHandler = null;
            }
        });
    });

    afterEach(() => {
        destroyTouchEvents();
    });

    test("registerTouchEvents should add event listeners", () => {
        registerTouchEvents();
        expect(document.addEventListener).toHaveBeenCalledWith("touchstart", touchStartHandler);
        expect(state.container!.addEventListener).toHaveBeenCalledWith("touchmove", touchMoveHandler, { passive: false });
    });

    test("destroyTouchEvents should remove event listeners", () => {
        registerTouchEvents();
        destroyTouchEvents();
        expect(document.removeEventListener).toHaveBeenCalled();
        expect(state.container.removeEventListener).toHaveBeenCalled();
    });

    test("onTouchStartHandler should set touchStartCoordinates", () => {
        const event = initializeTouchEvent();
        onTouchStartHandler(event);
        expect(touchStartCoordinates).toEqual({ x: 10, y: 20 });
    });

    test("getEventCoordinated should return coordinates from TouchEvent", () => {
        const event = initializeTouchEvent();
        const coordinates = getEventCoordinated(event);
        expect(coordinates).toEqual({ x: 10, y: 20 });
    })

    function initializeTouchEvent() {
        return new TouchEvent("touchstart", { touches: [{
            pageX: 10, pageY: 20,
            clientX: 0,
            clientY: 0,
            force: 0,
            identifier: 0,
            radiusX: 0,
            radiusY: 0,
            rotationAngle: 0,
            screenX: 0,
            screenY: 0,
            target: undefined
        }]});
    }
});