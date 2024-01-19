export type FolderMenuListType = FolderMenu[];

export interface FolderMenu {
  id: number;
  created_at: string;
  favorite: boolean;
  name: string;
  link_count: number;
}
