## Overview

Simple, easy to use typescript library that creates page websites also called as fullscreen scrolling websites. Suggestion are more then welcome, not only for features but also for code quality improvements. Let's make this library together.

## Getting Started

```
npm i @furman1331/page-scroller
```

## How to use

To initialize Page scroller you should use usePageScroller function where you configure whole library. And execute <strong>initPageScroller</strong>, it should contain the id of elements wrapper.

Important!
The page which you wanna use as page-scroller should have minimum height of 100vh!
Otherway it won't work well

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

#### changeSectionOrSlideByDirection(direction: 'down' | 'up')
Change section by direction, available parameter could be: "down" | "up". <br />
When using with slides "down" equals "right", "up" equals "left"

#### changeSectionByDirection(direction: 'down' | 'up')
Change section by direction, parameter could be: "down" | "up" <br />
It won't work on slides

#### changeSectionBySpecificIndex(index: number)
Change section to specific index. sections start from 0 to the amount you have in the project

### changeSlideByDirection(direction: 'right' | 'left')
Change active slide section position to choosen direction.
Parameter direction could be: 'right' | 'left'

#### getActiveSection()
Current section index number.

### onDestroy()
Destroy Page Scroller Plugin

### changeScrollingMode()
Change current scrolling mode, parameter could be: "manual" | "automatic"

#### Manual
Switch plugin from scrolling by page to default scroll, could be usefull while building mobile version of application

#### Automatic
Switch back to whole page scroller.

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
import { changeSectionOrSlideByDirection } from "@furman1331/page-scroller";

const changeSectionDown = () => changeSectionOrSlideByDirection("down"); // Section down or Slide right if available.
```

```javascript
import { changeSectionByDirection } from "@furman1331/page-scroller";

const changeSectionUp = () => changeSectionByDirection("up"); // Section up
```

```javascript
import { getActiveSection } from "@furman1331/page-scroller";

console.log(getActiveSection) // It will console log active section index.
```

```javascript
import { changeScrollingMode } from "@furman1331/page-scroller";

changeScrollingMode("manual");

changeScrollingMode("automatic");
```

## Options

- `scrollMode`: (default: "automatic") Defines the scrolling mode, there are 2 modes available "automatic" & "manual". If this option is set in "automatic" page scrolling work as ussual, you can scroll whole page by mouse, keyboard or touch. But if we switch the option into "manual", scroll bar will be visible, you can't scroll page by keyboard, touch, scroll down by scrollbar works normal like without this plugin. It helps with adjustment page to smaller device.

- `scrollingSpeed`: (default: 700) Defines the scrolling speed in milliseconds.

- `transitionTimingFunction`: (default: "ease") Defines the transition effect to use for changing sections.

- `slidesIdentifyAttribute`: (default: "page-scroller-slide") Specifies the name of the attribute that identifies slides in sections

- `isAllowToScrollThroughSlides`: (default: false) Defines the ability to scroll through slides via keyboard, mouse, etc. When disabled slides need to be handled by the `changeSlideByDirection` method.

- `isDebug`: (default: `false`) Defines status of debug logs

- `isPageScrolling`: (default: `true`) Defines

- `isWheelEnabled`: (default: `true`) Defines status of the possibility of scrolling through sections using mouse wheel.

- `isKeyboardEnabled`: (default: `true`) Defines status of the possibility of scrolling through sections using Keyboard.

- `isTouchEnabled`: (default: `true`) Defines status of the possibility of scrolling through sections using Touch screen.


## License

ISC
