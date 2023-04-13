// general
export enum UserRoles {
  BUYER = 'buyer',
  SELLER = 'seller',
  JUNKSHOP = 'shop',
}

export enum ProductStatus {
  SOLD = 'sold',
  UNSOLD = 'unsold',
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
}

export interface IConversation {
  id: number;
  messages: IMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface IConversationSummary {
  id: number;
  message: Partial<IMessage>;
  sender: Partial<IUser>;
  recipient: Partial<IUser>;
}

export interface IMessage {
  id: number;
  content: string;
  conversation?: IConversation;
  isSeen: boolean;
  sender: IUser;
  recipient: IUser;
  createdAt: string;
}

export interface INotification {
  id: number;
  description: string;
  event: string;
  isSeen: boolean;
  from: IUser;
  to: IUser;
  product?: IProduct;
  createdAt: string;
}

export interface IProduct {
  id: number;
  name: string;
  slug: string;
  category: ICategory;
  description: string;
  price: number;
  status: ProductStatus;
  offers: IProductOffer[];
  owner: IUser;
  thumbnail: string;
}

export interface IProductOffer {
  id: number;
  price: number;
  user: IUser;
  product?: IProduct;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: number;
  mobile: number;
  email: string;
  username: string;
  junkShopName?: string;
  role: UserRoles;
}

export interface IServiceDataError {
  statusCode: number;
  message: string;
  error: string;
}

export interface IServiceError {
  data: IServiceDataError;
  status: number;
}

// state related interface
export interface IAppState {
  error: string;
  isInitialize: boolean;
  role: UserRoles;
}

export interface ICategoryState {
  error: string;
  isLoading: boolean;
  list: ICategory[];
}

export interface IConversationState {
  error: string;
  isLoading: boolean;
  data: IConversation | null;
  list: IConversationSummary[];
}

export interface ICounterState {
  value: number;
}

export interface INotificationState {
  error: string;
  success: string;
  isLoading: boolean;
  data: INotification | null;
  list: INotification[];
}

export interface IProductState {
  error: string;
  success: string;
  isLoading: boolean;
  data: IProduct | null;
  list: IProduct[];
}

export interface IProductOfferState {
  error: string;
  success: string;
  isLoading: boolean;
}

export interface IShopState {
  isLoading: boolean;
  error: string;
  success: string;
  data: IUser;
  list: IUser[];
}

export interface IUserState {
  isLoading: boolean;
  error: string;
  token: string;
  data: IUser;
}

// response interface
export interface ICreateMessageResponse extends IMessage {}

export interface ICreateProductResponse extends IProduct {}

export interface ICreateProductOfferResponse extends IProductOffer {}

export interface IGetCategoryResponse extends ICategory {}

export interface IGetConversationResponse extends IConversation {}

export interface IGetConversationMessageResponse extends IMessage {}

export interface IGetConversationSummaryResponse extends IConversationSummary {}

export interface IGetNotificationResponse extends INotification {}

export interface IGetProductResponse extends IProduct {}

export interface ILoginResponse {
  accessToken: string;
}

export interface IUserMeResponse extends IUser {}

// navigation things

export type LoggedoutStackParam = {
  SelectRole: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type BuyerStackParam = {
  BuyerChat: { conversationId: number; recipient: IUser };
  BuyerChatShop: { shop: IUser };
  BuyerChatProduct: { seller: IUser };
  BuyerHome: undefined;
  BuyerProfileSettings: undefined;
  BuyerViewProduct: { productId: number };
};

export type BuyerMainTabParam = {
  Product: undefined;
  Shop: undefined;
  Notification: undefined;
  Profile: undefined;
};

export type BuyerNotificationTabParam = {
  NotificationTab: undefined;
  MessageTab: undefined;
};

export type SellerStackParam = {
  SellerChat: { conversationId: number; recipient: IUser };
  SellerCreateProduct: undefined;
  SellerHome: undefined;
  SellerProfileSettings: undefined;
  SellerViewOffers: { wasRedirectedFromNotification?: boolean };
  SellerViewProduct: { productId: number; isRedirectToOffers?: boolean };
};

export type SellerMainTabParam = {
  Product: undefined;
  Notification: undefined;
  Profile: undefined;
};

export type SellerNotificationTabParam = {
  NotificationTab: undefined;
  MessageTab: undefined;
};

export type ShopStackParam = {
  ShopChat: { conversationId: number; recipient: IUser };
  ShopHome: undefined;
  ShopProfileSettings: undefined;
};

export type ShopMainTabParam = {
  Messages: undefined;
  Profile: undefined;
};
