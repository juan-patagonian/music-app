import {
  getNextSongs,
  SpotifySongResponse,
} from "../../../services/spotify.service";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { SongListItem } from "./SongListItem";

type Props = {
  searchResults: SpotifySongResponse;
};
const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};
export const SongList = ({ searchResults }: Props) => {
  const [currentSearchResults, setCurrentSearchResults] =
    useState(searchResults);

  const [totalSongList, setTotalSongList] = useState(
    searchResults.tracks.items
  );

  const fetchNextSongs = async () => {
    const nextSongsResponse = await getNextSongs(currentSearchResults);
    if (nextSongsResponse) {
      setCurrentSearchResults(nextSongsResponse);
      setTotalSongList([...totalSongList, ...nextSongsResponse.tracks.items]);
    }
  };

  return (
    <div id="scrollableDiv" style={{ height: 300, overflow: "auto" }}>
      <InfiniteScroll
        dataLength={totalSongList.length}
        next={fetchNextSongs}
        hasMore={!!currentSearchResults.tracks.next}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        {totalSongList.map((song, index) => (
          <SongListItem song={song} key={index} />
        ))}
      </InfiniteScroll>
    </div>
  );
};
