import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  memo,
} from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import {
  StyledScrollContainer,
} from './styled';

// forwardRef 必须定义的时候写
const Scroll = forwardRef(({
  direction,
  click,
  refresh,
  onScroll,
  pullUp,
  pullDown,
  bounceTop,
  bounceBottom,
  children,
}, ref) => {
  const [bScroll, setBScroll] = useState(null);
  const scrollContainerRef = useRef(null);

  // 初始化
  useEffect(() => {
    const bs = new BScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });
    setBScroll(bs);
    return () => {
      setBScroll(null);
    };
  }, [bounceBottom, bounceTop, click, direction]);

  // 刷新滚动区域
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  }, [bScroll, refresh]);

  // 如果需要监听滚动距离事件，则响应传递进来的onScroll事件,并把scroll滚动对象传递出去
  useEffect(() => {
    if (!bScroll || !onScroll) {
      return () => {};
    }
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off('scroll');
    };
  }, [bScroll, onScroll, pullDown]);

  // 如果需要上拉加载，则在滚动到最大距离加50px的时候, 在scrollEnd触发传递进来的pullUp事件
  useEffect(() => {
    if (!bScroll || !pullUp) {
      return () => {};
    }
    bScroll.on('scrollEnd', () => {
      if (bScroll.y <= bScroll.maxScrollY + 50) {
        pullUp();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    };
  }, [bScroll, pullUp]);

  // 如果需要下拉刷新，则在下拉到最大距离大于50px的时候, 在touchEnd触发传递进来的pullDown事件
  useEffect(() => {
    if (!bScroll || !pullDown) {
      return () => {};
    }
    bScroll.on('touchEnd', (scroll) => {
      if (scroll.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off('touchEnd');
    };
  }, [bScroll, pullDown]);

  useImperativeHandle(ref, () => {
    return {
      // 给外界暴露refresh方法
      refresh: () => {
        if (bScroll) {
          bScroll.refresh();
          bScroll.scrollTo(0, 0);
        }
      },
      // 给外界暴露getBScroll方法, 提供bs实例
      getBScroll: () => {
        return bScroll || '';
      },
      scrollTo: (x, y) => {
        if (bScroll) {
          bScroll.scrollTo(x, y);
        }
      },
      scrollBy: (x, y, t) => { // t 是滚动时间
        if (bScroll) {
          bScroll.scrollBy(x, y, t);
        }
      },
      scrollToElement: (el) => {
        if (bScroll) {
          bScroll.scrollToElement(el);
        }
      },
    };
  });

  return (
    <StyledScrollContainer ref={scrollContainerRef}>
      { children }
    </StyledScrollContainer>
  );
});

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']), // 滚动的方向
  click: PropTypes.bool, // 是否支持点击
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func, // 滑动触发的回调函数
  pullUp: PropTypes.func, // 上拉加载逻辑
  pullDown: PropTypes.func, // 下拉加载逻辑
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool, // 是否支持向下吸底
  children: PropTypes.node,
};

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
};

export default memo(Scroll);
