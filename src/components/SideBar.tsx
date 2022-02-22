
import { useEffect, useState } from 'react';
import '../styles/sidebar.scss';

import { Button } from '../components/Button';

import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  changeSelectedGenre: (genre: GenreResponseProps) => void;
}

export function SideBar({changeSelectedGenre}: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
      setSelectedGenre(response.data[0]);
    });
  }, []);

  function handleClickButton(genre: GenreResponseProps) {
    changeSelectedGenre(genre);
    setSelectedGenre(genre);
  }

  useEffect(() => {
    changeSelectedGenre(selectedGenre);
  }, [selectedGenre])

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre)}
              selected={selectedGenre.id === genre.id}
            />
            ))
          }
        </div>

      </nav>
  )
}