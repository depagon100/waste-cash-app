declare module Screens {
  type LoggedOutStackParams = {
    SelectRoleScreen: undefined;
    SignInScreen: undefined;
    SignUpScreen: undefined;
  };

  // Buyer
  type BuyerStackParams = {
    BuyerInitialScreen: undefined;
    BuyerProductMapScreen: undefined;
    BuyerViewConversationScreen: {
      conversationId?: number;
      recipient?: Objects.User;
    };
    BuyerViewNotificationScreen: Objects.Notification;
    BuyerViewProductScreen: { id: number };
    BuyerViewMap: undefined;
  };

  type BuyerInitialScreenTabs = {
    ProductsTabView: undefined;
    ShopsTabView: undefined;
    NotificationsScreen: undefined;
    ProfileTabView: undefined;
  };

  type BuyerNotificationScreenTabs = {
    NotificationsTabView: undefined;
    MessagesTabView: undefined;
  };

  // Junk Shop
  type JunkShopParams = {
    JunkShopInitialScreen: undefined;
    JunkShopViewConversationScreen: {
      conversationId?: number;
      recipient?: Objects.User;
    };
  };

  type JunkShopInitialScreenTabs = {
    NotificationsScreen: undefined;
    ProfileTabView: undefined;
  };

  type JunkShopNotificationScreenTabs = {
    NotificationsTabView: undefined;
    MessagesTabView: undefined;
  };

  // Seller
  type SellerStackParams = {
    SellerInitialScreen: undefined;
    SellerBidderSetup: undefined;
    SellerCreateProductScreen: undefined;
    SellerListOffersScreen: undefined;
    SellerViewConversationScreen: {
      conversationId?: number;
      recipient?: Objects.User;
    };
    SellerViewNotificationScreen: Objects.Notification;
    SellerViewProductScreen: { id: number };
    SellerSetMap: { currentAddress?: Objects.Address };
  };

  type SellerInitialScreenTabs = {
    ProductsTabView: undefined;
    NotificationsScreen: undefined;
    ProfileTabView: undefined;
  };

  type SellerNotificationScreenTabs = {
    NotificationsTabView: undefined;
    MessagesTabView: undefined;
  };
}
