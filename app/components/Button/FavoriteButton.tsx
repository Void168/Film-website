import React, { useCallback, useMemo } from "react";

import useCurrentUser from "../../hooks/useCurrentUser";
import useFavorites from "../../hooks/useFavorites";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser()
    
    const isFavorite = useMemo(() => {
      const list = currentUser?.favouriteIds || [];

      return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
      let response;

      if (isFavorite) {
        response = await axios.delete("/api/delete", { data: { movieId } });
      } else {
        response = await axios.post("/api/favorite", { movieId });
      }

      const updatedFavoriteIds = response?.data?.favouriteIds;

      mutate({
        ...currentUser,
        favouriteIds: updatedFavoriteIds,
      });

      mutateFavorites();
    }, [currentUser, isFavorite, movieId, mutate, mutateFavorites]);

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center transition hover:border-neutral-300"
    >
      <Icon className="text-white mt-1" size={25} />
    </div>
  );
};

export default FavoriteButton;
