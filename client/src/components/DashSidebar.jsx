import {Sidebar} from 'flowbite-react';
import {HiUser, HiArrowSmRight} from 'react-icons/hi'
import { useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  // we want to use useeffect reat hook so each time we come to this page we want to get its tab
  useEffect(()=>{
    // we use useSearchParams constructor to get search
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab');
    // console.log(tabFromUrl);
    // inserting the value of profile url to  
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor = 'dark'>Profile</Sidebar.Item>
          </Link>
          <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer'>Sign Out</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
