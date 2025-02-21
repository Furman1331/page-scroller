# Page-Scroller

![Page-scroller version](https://img.shields.io/npm/v/%40furman1331%2Fpage-scroller)
![License](https://img.shields.io/npm/l/%40furman1331%2Fpage-scroller)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/furman1331)

[Codepen](https://codepen.io/pen?template=GgKLjEx)

# Overview

A simple and easy-to-use TypeScript-supported library for creating full-page scrolling websites. Contributions are always welcome—not just for new features, but also for improving code quality. Let’s build this library together!

- [Usage](https://github.com/Furman1331/page-scroller#usage)
- [Options](https://github.com/Furman1331/page-scroller#options)
- [Methods](https://github.com/Furman1331/page-scroller#methods)
- [Callbacks](https://github.com/Furman1331/page-scroller#callbacks)
- [Reporting issues](https://github.com/Furman1331/page-scroller#reporting-issues)
- [Contributing](https://github.com/Furman1331/page-scroller#contributing)
- [License](https://github.com/Furman1331/page-scroller#license)

# Usage

### Install using npm

```
npm i @furman1331/page-scroller
```

### Sections

To initialize Page Scroller, use the usePageScroller function to configure the library. Then, call <strong>initPageScroller</strong>, ensuring it includes the ID of the element wrapper.

Simple example with slides:

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

### Slides

Version 1.1.0 introduced the ability to create slides that scroll sideways. To achieve this, use the following structure:

```javascript
import { usePageScroller } from "@furman1331/page-scroller";

usePageScroller().initPageScroller("#page-scroller");

<div id="page-scroller">
    <section class="page-scroller__section">
        <FirstSection />
    </section>
    <section class="page-scroller__section">
        <div page-scroller-slide>
            <SecondSectionFirstSlide />
        </div>
        <div page-scroller-slide>
            <SecondSectionSecondSlide />
        </div>
    </section>
</div>
```

By default to scroll the slides to the side you need to use the method: ```changeSlideByDirection```, but we can also enable the slides to move in the same way as the sections, to do this we need to set the ```isAllowToScrollThroughSlides``` option to true.

```javascript
import { usePageScroller } from "@furman1331/page-scroller";

usePageScroller({ isAllowToScrollThroughSlides: true }).initPageScroller("#page-scroller");
```

# Options

- `scrollMode`: (default: `"automatic"`) Defines the scrolling mode, there are 2 modes available "automatic" & "manual". If this option is set in "automatic" page scrolling work as ussual, you can scroll whole page by mouse, keyboard or touch. But if we switch the option into "manual", scroll bar will be visible, you can't scroll page by keyboard, touch, scroll down by scrollbar works normal like without this plugin. It helps with adjustment page to smaller device.

- `scrollingSpeed`: (default: `700`) Defines the scrolling speed in milliseconds.

- `transitionTimingFunction`: (default: `"ease"`) Defines the transition effect to use for changing sections.

- `slidesIdentifyAttribute`: (default: `"page-scroller-slide"`) Specifies the name of the attribute that identifies slides in sections

- `isAllowToScrollThroughSlides`: (default: `false`) Defines the ability to scroll through slides via keyboard, mouse, etc. When disabled slides need to be handled by the `changeSlideByDirection` method.

- `isDebug`: (default: `false`) Defines status of debug logs

- `isPageScrolling`: (default: `true`) Defines

- `isWheelEnabled`: (default: `true`) Defines status of the possibility of scrolling through sections using mouse wheel.

- `isKeyboardEnabled`: (default: `true`) Defines status of the possibility of scrolling through sections using Keyboard.

- `isTouchEnabled`: (default: `true`) Defines status of the possibility of scrolling through sections using Touch screen.

# Methods

#### changeSectionOrSlideByDirection(direction: 'down' | 'up')
Change section by direction, available parameter could be: `"down" | "up"`. <br />
When using with slides "down" equals "right", "up" equals "left"

#### changeSectionByDirection(direction: 'down' | 'up')
Change section by direction, parameter could be: `"down" | "up"` <br />
It won't work on slides

#### changeSectionBySpecificIndex(index: number)
Change section to specific index. sections start from 0 to the amount you have in the project

#### changeSlideByDirection(direction: 'right' | 'left')
Change active slide section position to choosen direction.
Parameter direction could be: `'right' | 'left'`

#### getActiveSection()
Current section index number.

#### onDestroy()
Destroy Page Scroller Plugin

#### changeScrollingMode()
Change current scrolling mode, parameter could be: "manual" | "automatic"

- Manual: Switch plugin from scrolling by page to default scroll, could be usefull while building mobile version of application

- Automatic: Switch back to whole page scroller.

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

const changeSectionOrSlide = () => changeSectionOrSlideByDirection("down"); // Section down or Slide right if available.
```

```javascript
import { changeSlideByDirection } from "@furman1331/page-scroller";

const changeSlide = () => changeSlideByDirection("right"); // Change slide to right if possible
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

# Callbacks

#### onSectionChange(`beforeIndex: number, afterIndex: number`)
Triggered after section changed with 2 arguments `beforeIndex` and `afterIndex`.

#### onBeforeSectionChange(`beforeIndex: number, afterIndex: number`)
Triggered before section changed with 2 arguments `beforeIndex` and `afterIndex`.

# Reporting issues
1. Please, look for your issue before asking using github issues search.
2. Make sure you use the latest page-scroller version. No support is provided for older versions.
3. Use the [the Github Issues](https://github.com/Furman1331/page-scroller/issues) to create issue

# Contributing
Contributions are always welcome! If you'd like to fix a bug or propose a new feature, feel free to submit a Pull Request.

Guidelines:
- Commit your changes to the dev branch.
- Do not modify files in the dist/ directory.
- If your PR addresses an issue, mention the issue number in the comments (e.g., #16).
- Prioritize clarity over brevity in variable names, conditions, and functions.
- Provide a clear description of the problem in your Pull Request (yes, it’s obvious—but still worth mentioning!).
Thank you for your contributions! 🚀

# Changelog
To see the list of recent changes, see
[Releases section](https://github.com/Furman1331/page-scroller/releases).

## Contributors

<a href="https://github.com/furman1331/page-scroller/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=furman1331/page-scroller&max=400&columns=25&anon=1&v=2" />
</a>

## License

[MIT License](https://github.com/Furman1331/page-scroller/blob/master/LICENSE)
