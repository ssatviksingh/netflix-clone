export type StackParamList = {
    HomeFeed: undefined;
    BrowseMovies: undefined; // Added for Browse stack
    MovieDetail: { movie: { id: string; title: string; thumbnail: string; description: string } };
  };