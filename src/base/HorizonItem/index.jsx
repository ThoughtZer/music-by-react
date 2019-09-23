import React, {
  memo,
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Scroll from '../Scroll/index';
import {
  StyledHorizonWrapper,
  StyledHorizonItemList,
  StyledHorizonItemListItem,
} from './styled';

const HorizenItem = ({
  list,
  current,
  title,
  handleClick,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerDom = containerRef.current;
    const elems = containerDom.getElementsByTagName('span');
    let initWidth = 0;
    Array.from(elems).forEach((el) => {
      initWidth += el.offsetWidth;
    });
    containerDom.style.width = `${initWidth}px`;
    return () => {
    };
  }, []);

  return (
    <StyledHorizonWrapper>
      <span className="title">{ title }</span>
      <Scroll direction="horizontal">
        <div ref={containerRef}>
          <StyledHorizonItemList>
            {
              list.map((item) => {
                return (
                  <StyledHorizonItemListItem
                    key={item.name}
                    className={`${current === item.key ? 'selected' : ''}`}
                    onClick={() => handleClick(item.key)}
                  >
                    { item.name }
                  </StyledHorizonItemListItem>
                );
              })
            }
          </StyledHorizonItemList>
        </div>
      </Scroll>
    </StyledHorizonWrapper>
  );
};

HorizenItem.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({

  })),
  current: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
};

HorizenItem.defaultProps = {
  list: [],
  current: '',
  title: '',
  handleClick: null,
};

export default memo(HorizenItem);
