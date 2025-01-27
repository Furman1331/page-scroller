import { usePageScroller } from '../../usePageScroller'

import type { IPageScrollerOptions } from '@/types'

export function initializeTest(options?: IPageScrollerOptions) {
	document.body.innerHTML = `
        <div id="page-scoller">
            <div class="section">Section 1</div>
            <div class="section">Section 1</div>
        </div>
    `

	initializePageScrollerForTestingPourposes(options)
}

function initializePageScrollerForTestingPourposes(options?: IPageScrollerOptions) {
	usePageScroller(options).initPageScroller('#page-scoller')
}
