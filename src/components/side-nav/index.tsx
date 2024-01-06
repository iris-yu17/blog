'use client';

import { Sidebar } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiMail,
  HiViewBoards,
} from 'react-icons/hi';
import { PiInstagramLogoBold } from 'react-icons/pi';

function SideNav() {
  return (
    <div className="sticky left-0 top-0 h-screen hidden sm:block">
      <Sidebar
        aria-label="Default sidebar example"
        className="w-auto lg:w-64 [&>div]:flex [&>div]:flex-col [&>div]:bg-black"
      >
        <div className="mb-4 flex justify-center">
          <div className="h-12 w-12 lg:h-32 lg:w-32">
            <Image
              src="/sana.jpeg"
              width={150}
              height={150}
              alt="user"
              className="rounded-full"
            />
          </div>
        </div>
        <div
          className={
            'order-1 flex flex-col items-center justify-center gap-2 py-4 lg:order-none lg:flex-row'
          }
        >
          <Link href={'#'} className="p-2 text-2xl text-gray-500">
            <PiInstagramLogoBold />
          </Link>
          <Link href={'#'} className="p-2 text-2xl text-gray-500">
            <HiMail />
          </Link>
        </div>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {[
              HiArrowSmRight,
              HiChartPie,
              HiInbox,
              HiShoppingBag,
              // HiTable,
              // HiUser,
              // HiMail,
            ].map((item, index) => {
              return (
                <Sidebar.Item
                  href="#"
                  icon={item}
                  className="[&>span]:hidden lg:[&>span]:block"
                  key={index}
                >
                  Dashboard
                </Sidebar.Item>
              );
            })}
            <Sidebar.Item
              href="#"
              icon={HiViewBoards}
              label="Pro"
              labelColor="dark"
              className="[&>span]:hidden lg:[&>span]:block"
            >
              Kanban
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default SideNav;
