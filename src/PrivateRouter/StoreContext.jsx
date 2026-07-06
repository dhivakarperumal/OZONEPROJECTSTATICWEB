import React from "react";

export const StoreContext = React.createContext({
  cart: [],
  wishlist: [],
  videosCache: [],
  setVideosCache: () => {},
});

export default StoreContext;
