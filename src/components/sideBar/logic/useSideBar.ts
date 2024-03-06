import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getArticles, getChapters, mainState } from '../../../app/mainSlice';

export const useSideBar = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getChapters());
    dispatch(getArticles(''));
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        const timer = setTimeout(() => {
          setOpen(false);
        }, 200);
        return () => clearTimeout(timer);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpen]);

  return {
    state,
    open,
    setOpen,
    sideBarRef,
  };
};
