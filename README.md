## Overview

Simple, easy to use typescript library that creates page websites also called as fullscreen scrolling websites. Suggestion are more then welcome, not only for features but also for code quality improvements. Let's make this library together.

## Getting Started

```
npm i @furman1331/page-scroller
```

## How to use

To initialize Page scroller you should use usePageScroller function where you configure whole library. And execute <strong>initPageScroller</strong>, it should contain the id of elements wrapper.

```javascript
import { usePageScroller } from "@furman1331/page-scroller";

usePageScroller().initPageScroller("#page-scroller");

<div id="page-scroller">
    <section class="page-scroller__section">
        <FirstSection />
    </section>
    <section class="page-scroller__section">
        <SecondSection />
    </section>
</div>
```

## Configuration

The completed fields have default value of properties. You can left it empty if you want to use default values.

```javascript
usePageScroller({
    isDebug: false; // Disable/Enable debug
    isWheelEnabled: true; // Enable trigger by mouse wheel
    isKeyboardEnabled: true; // Enable trigger by keyboard
    isTouchEnabled: true; // Enable trigger by touch ( on touch screens )

    transitionTimingFunction?: string;

    scrollingSpeed: 700; // Speed of changing slides.

    onSectionChange?: (props: onSectionChangeProps) => unknown; // Function called after slide changed
    onBeforeSectionChange?: (props: onSectionChangeProps) => unknown; // Function called before slide changed
}).initPageScroller("#page-scroller");
```

## API
It's available in whole project so you can execure it in different places.

- changeSectionBySpecificIndex -  Change slide to specific index. Slides start from 0 to the amount you have in the project
- changeSectionByDirection - Change slide by direction, parameter could be: "down" | "up"
- getActiveSlide - Current slide index number.

Examples:
```javascript
import { changeSectionBySpecificIndex } from "@furman1331/page-scroller";

const changeSlideToContact = () => changeSectionBySpecificIndex(3); // In this case Contact Slide is the 4th.
```

```javascript
import { changeSectionByDirection } from "@furman1331/page-scroller";

const changeSlideToContact = () => changeSectionByDirection("down"); // Slide down
```

```javascript
import { changeSectionByDirection } from "@furman1331/page-scroller";

const changeSlideToContact = () => changeSectionByDirection("up"); // Slide up
```

```javascript
import { getActiveSlide } from "@furman1331/page-scroller";

console.log(getActiveSlide) // It will console log active slide index.
```

## License

ISC