<{if $block.slidetype == scrollable}>
<div class="slider">
    <div class="main">
        <div class="pages">
            <div class="page">
                <div class="scrollable">
                    <div class="items">
                        <{foreach item=slide from=$block.slide}>
                        <div class="item">
                            <div class="itemleft"><img width="<{$block.imagewidth}>" height="<{$block.imageheight}>"
                                                       src="<{$slide.imageurl}>" alt="<{$slide.story_title}>"/></div>
                            <div class="itemright">
                                <h2><{$slide.story_title}></h2>

                                <div class="itemshort"><{$slide.story_short}></div>
                                <div class="itemmore"><a title="<{$smarty.const._NEWS_MB_MORE}>" href="<{$slide.url}>"><{$smarty.const._NEWS_MB_MORE}></a>
                                </div>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <{/foreach}>
                    </div>
                </div>
                <div class="navi">
                    <{foreach item=slide from=$block.slide}>
                    <a title="<{$slide.story_title}>" class="tooltip<{if $slide.story_default == 1}> active<{/if}>"
                       href="#<{$slide.story_id}>"></a>
                    <{/foreach}>
                </div>
            </div>
        </div>
    </div>
</div>
<{elseif $block.slidetype == sliderkit}>
<div class="sliderkit newslider-vertical">
    <div class="sliderkit-nav">
        <div class="sliderkit-nav-clip">
            <ul>
                <{foreach item=slide from=$block.slide}>
                <li><a href="<{$slide.url}>" title="<{$slide.story_title}>"><{$slide.story_title}></a></li>
                <{/foreach}>
            </ul>
        </div>
    </div>
    <div class="sliderkit-panels">
        <{foreach item=slide from=$block.slide}>
        <div class="sliderkit-panel">
            <div class="sliderkit-news">
                <a href="#" title="<{$slide.story_title}>"><img width="<{$block.imagewidth}>"
                                                                height="<{$block.imageheight}>"
                                                                src="<{$slide.imageurl}>" alt="<{$slide.story_title}>"/></a>

                <h3><a title="<{$slide.story_title}>" href="<{$slide.url}>"><{$slide.story_title}></a></h3>

                <p><{$slide.story_short}> <a title="<{$slide.story_title}>" class="sliderkit-news-readmore"
                                             href="<{$slide.url}>"><{$smarty.const._NEWS_MB_MORE}></a></p>
            </div>
        </div>
        <{/foreach}>
    </div>
</div>
<{/if}>