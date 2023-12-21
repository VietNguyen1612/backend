export interface Post {
  authorId: string;
  _id: string;
  content: string;
  createdDate: Date;
  lastUpdated: Date;
  isUpdated: boolean;
  commentCount: number;
  likedBy: string[];
  assests: string[];
}
