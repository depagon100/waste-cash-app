declare module State {
  interface App {
    error: string;
    isInitialize: boolean;
    role?: string;
  }

  interface BidderSEtup {
    error: string;
    success: string;
    isLoading: boolean;
  }

  interface Category {
    error: string;
    isLoading: boolean;
    list: Objects.Category[];
  }

  interface Conversation {
    error: string;
    isLoading: boolean;
    data?: Objects.Conversation;
    list: Objects.ConversationSummary[];
  }

  interface Map {
    data?: Objects.Map;
  }

  interface Notification {
    error: string;
    isLoading: boolean;
    data?: Objects.Notification;
    list: Objects.Notification[];
  }

  interface Product {
    error: string;
    success: string;
    isLoading: boolean;
    data?: Objects.Product;
    list: Objects.Product[];
  }

  interface ProductOffer {
    error: string;
    success: string;
    isLoading: boolean;
  }

  interface Review {
    error: string;
    success: string;
    isLoading: boolean;
    list: Objects.Review[];
  }

  interface Shop {
    error: string;
    isLoading: boolean;
    data?: Objects.User;
    list: Objects.User[];
  }

  interface User {
    error: string;
    isLoading: boolean;
    token: string;
    data?: Objects.User;
  }
}
