
import './styles/global.scss';


import './styles/content.scss';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { useState } from 'react';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}


export function App() {

  const [selectedGenre, setSelectedGenre] = useState({} as GenreResponseProps);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar changeSelectedGenre={setSelectedGenre} />
      <Content genre={selectedGenre} />
    </div>
  )
}