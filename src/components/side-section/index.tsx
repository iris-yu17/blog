'use client';

import SideMenu from '../side-menu';
import SideNav from '../side-nav';

export default function SideSection() {
  return (
    <div className="flex">
      <SideNav/>
      <SideMenu />
    </div>
  );
}
