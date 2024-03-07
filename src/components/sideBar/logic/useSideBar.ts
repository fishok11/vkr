import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getArticles, getChapters, mainState } from '../../../app/mainSlice';
import styles from '../SideBar.module.scss';

export const useSideBar = () => {
  const state = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const sideBarRef = useRef<HTMLDivElement>(null);
  const [sideBarStyle, setSideBarStyle] = useState(styles.sideBarContainerOpen);

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
        setSideBarStyle(styles.sideBarContainerClose);
        const timer = setTimeout(() => {
          setOpen(false);
          setSideBarStyle(styles.sideBarContainerOpen);
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
    sideBarStyle,
  };
};
