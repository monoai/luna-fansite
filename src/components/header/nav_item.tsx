import * as React from 'react';
import "./nav_item.css";

export const NavItem = (props: React.PropsWithChildren<{}>) => <span className='navItem'>{props.children}</span>