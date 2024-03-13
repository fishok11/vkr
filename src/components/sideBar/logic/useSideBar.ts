import {
  useEffect,
  // useRef,
  // useState
} from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getArticles, getChapters, mainState } from '../../../app/mainSlice';
// import styles from '../SideBar.module.scss';

export const useSideBar = () => {
  const stateMain = useAppSelector(mainState);
  const dispatch = useAppDispatch();
  // const [open, setOpen] = useState<boolean>(false);
  // const sideBarRef = useRef<HTMLDivElement>(null);
  // const [sideBarStyle, setSideBarStyle] = useState(styles.sideBarContainerOpen);
  // const handleCloseSideBar = () => {
  //   setSideBarStyle(styles.sideBarContainerClose);
  //   const timer = setTimeout(() => {
  //     setOpen(false);
  //     setSideBarStyle(styles.sideBarContainerOpen);
  //   }, 200);
  //   return () => clearTimeout(timer);
  // };

  useEffect(() => {
    dispatch(getChapters());
    dispatch(getArticles(''));
  }, [dispatch]);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       sideBarRef.current &&
  //       !sideBarRef.current.contains(event.target as Node)
  //     ) {
  //       handleCloseSideBar();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [setOpen]);

  return {
    stateMain,
    // open,
    // setOpen,
    // sideBarRef,
    // sideBarStyle,
    // handleCloseSideBar,
  };
};
