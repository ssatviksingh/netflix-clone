// react-native-drawer.d.ts
declare module 'react-native-drawer' {
    import { Component, ReactNode } from 'react';
    import { ViewStyle, Animated } from 'react-native';
  
    interface DrawerProps {
      open: boolean;
      onClose: () => void;
      type?: 'overlay' | 'static' | 'displace';
      content: ReactNode;
      tapToClose?: boolean;
      openDrawerOffset?: number | ((viewportWidth: number) => number);
      panOpenMask?: number;
      tweenHandler?: (ratio: number) => { main: ViewStyle; [key: string]: ViewStyle };
    }
  
    const Drawer: Component<DrawerProps>;
    export default Drawer;
  }