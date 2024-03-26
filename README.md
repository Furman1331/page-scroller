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

## Methods
It's available in whole project so you can execure it in different places.

#### changeSectionBySpecificIndex()
Change section to specific index. sections start from 0 to the amount you have in the project

#### changeSectionByDirection()
Change section by direction, parameter could be: "down" | "up"

#### getActiveSection()
Current section index number.

### onDestroy()
Destroy Page Scroller Plugin

Examples:
```javascript
import { changeSectionBySpecificIndex } from "@furman1331/page-scroller";

const changeSectionToContact = () => changeSectionBySpecificIndex(3); // In this case Contact Section is the 4th.
```

```javascript
import { changeSectionByDirection } from "@furman1331/page-scroller";

const changeSectionDown = () => changeSectionByDirection("down"); // Section down
```

```javascript
import { changeSectionByDirection } from "@furman1331/page-scroller";

const changeSectionUp = () => changeSectionByDirection("up"); // Section up
```

```javascript
import { getActiveSection } from "@furman1331/page-scroller";

console.log(getActiveSection) // It will console log active section index.
```

## Options

- `scrollingSpeed`: (default: 700) Defines the scrolling speed in milliseconds.

- `transitionTimingFunction`: (default: "ease") Defines the transition effect to use for changing sections.

- `isDebug`: (default: `false`) Defines status of debug logs

- `isWheelEnabled`: (default: `true`) Defines status of the possibility of scrolling through sections using mouse wheel.

- `isKeyboardEnabled`: (default: `true`) Defines status of the possibility of scrolling through sections using Keyboard.

- `isTouchEnabled`: (default: `true`) Defines status of the possibility of scrolling through sections using Touch screen.


## License

ISC