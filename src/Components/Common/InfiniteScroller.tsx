import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  className: string;
  onScrollBottom?: () => any
}

const InfiniteScroller: React.FC<Props> = ({ children, className, onScrollBottom }) => {
  const scrollDivRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const scrollDiv = scrollDivRef.current;
    if (!scrollDiv) return;

    // Check if the div is scrolled to the bottom
    if (scrollDiv.scrollTop + scrollDiv.clientHeight >= scrollDiv.scrollHeight) {
      onScrollBottom && onScrollBottom();
    }
  };

  useEffect(() => {
    const scrollDiv = scrollDivRef.current;
    if (!scrollDiv) return;

    const handleScrollEvent = () => handleScroll();
    scrollDiv.addEventListener('scroll', handleScrollEvent);

    // Clean up the event listener on component unmount
    return () => {
      scrollDiv.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  useEffect(() => {
    const scrollDiv = scrollDivRef.current;
    if (!scrollDiv) return;

    // Preserve scroll position
    const scrollTopBeforeUpdate = scrollDiv.scrollTop;
    const scrollHeightBeforeUpdate = scrollDiv.scrollHeight;

    const observer = new MutationObserver(() => {
      const newScrollHeight = scrollDiv.scrollHeight;
      scrollDiv.scrollTop = scrollTopBeforeUpdate + (newScrollHeight - scrollHeightBeforeUpdate);
      observer.disconnect();
    });

    observer.observe(scrollDiv, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return <div className={`${className} flex-1 p-4 overflow-y-auto`} ref={scrollDivRef}>{children}</div>
}

export default InfiniteScroller;
